import { Inject, Injectable, Logger } from '@nestjs/common';
import { NotFoundError, ValidationError } from '@salychain/errors';
import { ulid } from 'ulid';
import { CasePriority, CaseStatus, Prisma, SubjectKind, VerificationTier } from '../generated/prisma/index.js';
import { PII_VAULT, PiiVault } from '../crypto/pii-vault.js';
import { KycService } from '../kyc/kyc.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import {
  buildStepOrder,
  fetchActiveRequirements,
  stepLabelFromKey,
  type RequirementSnapshot,
} from './admin-requirements.js';

export type OnboardingProfile = 'business' | 'developer';
export type OnboardingStepStatus = 'pending' | 'done';
export type OnboardingFlowStatus = 'not_started' | 'in_progress' | 'pending_review' | 'complete' | 'rejected';

export interface OnboardingStepState {
  status: OnboardingStepStatus;
  completed_at?: string;
  data?: Record<string, unknown>;
}

export interface OnboardingMetadata {
  flow: 'progressive_kyb' | 'progressive_kyc';
  version: 1;
  status: OnboardingFlowStatus;
  profile: OnboardingProfile;
  steps: Record<string, OnboardingStepState>;
  step_order?: string[];
  requirements?: RequirementSnapshot[];
  started_at: string;
  submitted_at?: string;
  approved_at?: string;
  rejected_at?: string;
  ocr?: Record<string, unknown>;
}

const FALLBACK_BUSINESS_STEPS = ['business_details', 'documents', 'beneficial_owners'] as const;
const FALLBACK_DEVELOPER_STEPS = ['personal_details', 'identity_documents', 'address'] as const;

@Injectable()
export class OnboardingService {
  private readonly logger = new Logger(OnboardingService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly kyc: KycService,
    @Inject(PII_VAULT) private readonly pii: PiiVault,
  ) {}

  /** Decrypt sealed step payloads after loading from the DB. */
  private hydrateMetadata(raw: unknown): OnboardingMetadata | null {
    const metadata = parseMetadata(raw);
    if (!metadata) return null;
    for (const step of Object.values(metadata.steps)) {
      if (step.data !== undefined) {
        step.data = this.pii.openJson<Record<string, unknown>>(step.data);
      }
    }
    if (metadata.ocr) {
      const opened: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(metadata.ocr)) {
        opened[key] = this.pii.openJson(value);
      }
      metadata.ocr = opened;
    }
    return metadata;
  }

  /** Encrypt step payloads before persisting metadata JSON. */
  private sealMetadata(metadata: OnboardingMetadata): OnboardingMetadata {
    const sealed: OnboardingMetadata = {
      ...metadata,
      steps: {},
      ...(metadata.ocr ? { ocr: {} } : {}),
    };
    for (const [key, step] of Object.entries(metadata.steps)) {
      sealed.steps[key] = {
        ...step,
        ...(step.data !== undefined
          ? { data: this.pii.sealJson(step.data) as Record<string, unknown> }
          : {}),
      };
    }
    if (metadata.ocr && sealed.ocr) {
      for (const [key, value] of Object.entries(metadata.ocr)) {
        sealed.ocr[key] = this.pii.sealJson(value);
      }
    }
    return sealed;
  }

  async start(input: {
    externalRef: string;
    profile: OnboardingProfile;
    displayName?: string;
    email?: string;
  }) {
    const profile = input.profile;
    const flow = profile === 'business' ? 'progressive_kyb' : 'progressive_kyc';
    const kind: SubjectKind = profile === 'business' ? 'BUSINESS' : 'USER';

    const requirements = await fetchActiveRequirements(profile);
    const stepOrder =
      requirements.length > 0
        ? buildStepOrder(requirements, profile)
        : [...(profile === 'business' ? FALLBACK_BUSINESS_STEPS : FALLBACK_DEVELOPER_STEPS)];

    const existing = await this.prisma.complianceSubject.findUnique({
      where: { externalRef: input.externalRef },
    });

    const metadata = this.hydrateMetadata(existing?.metadata);
    if (metadata?.status === 'pending_review' || metadata?.status === 'complete') {
      return this.toPublic(existing!, metadata);
    }
    if (metadata?.status === 'rejected') {
      return this.toPublic(existing!, metadata);
    }

    const steps: Record<string, OnboardingStepState> = {};
    for (const key of stepOrder) steps[key] = { status: 'pending' };

    const nextMetadata: OnboardingMetadata = {
      flow,
      version: 1,
      status: 'in_progress',
      profile,
      steps,
      step_order: stepOrder,
      requirements: requirements.length > 0 ? requirements : undefined,
      started_at: metadata?.started_at ?? new Date().toISOString(),
    };

    const stored = this.sealMetadata(nextMetadata);
    const subject = await this.prisma.complianceSubject.upsert({
      where: { externalRef: input.externalRef },
      update: {
        displayName: input.displayName ?? undefined,
        kind,
        metadata: stored as unknown as Prisma.InputJsonValue,
      },
      create: {
        externalRef: input.externalRef,
        kind,
        displayName: input.displayName ?? null,
        tier: VerificationTier.TIER_0,
        metadata: stored as unknown as Prisma.InputJsonValue,
      },
    });

    this.logger.log(`Onboarding started for ${input.externalRef} (${profile}, ${stepOrder.length} steps)`);
    return this.toPublic(subject, nextMetadata);
  }

  async get(externalRef: string) {
    const subject = await this.prisma.complianceSubject.findUnique({ where: { externalRef } });
    if (!subject) {
      return emptyStatus(externalRef);
    }
    const metadata = this.hydrateMetadata(subject.metadata);
    if (!metadata) return emptyStatus(externalRef);
    return this.toPublic(subject, metadata);
  }

  async submitStep(externalRef: string, step: string, data: Record<string, unknown>) {
    const subject = await this.prisma.complianceSubject.findUnique({ where: { externalRef } });
    if (!subject) throw NotFoundError('compliance.subject_not_found', `Subject ${externalRef} not found`);

    const metadata = this.hydrateMetadata(subject.metadata);
    if (!metadata) {
      throw ValidationError('compliance.onboarding.not_started', 'Onboarding has not been started');
    }
    if (metadata.status === 'pending_review' || metadata.status === 'complete') {
      return this.toPublic(subject, metadata);
    }
    if (metadata.status === 'rejected') {
      metadata.status = 'in_progress';
    }
    if (!metadata.steps[step]) {
      throw ValidationError('compliance.onboarding.invalid_step', `Unknown onboarding step "${step}"`);
    }

    const enriched = enrichStepData(step, data, metadata.requirements);
    metadata.steps[step] = {
      status: 'done',
      completed_at: new Date().toISOString(),
      data: enriched.data,
    };
    if (enriched.ocr) {
      metadata.ocr = { ...(metadata.ocr ?? {}), [step]: enriched.ocr };
    }
    metadata.status = 'in_progress';

    const stepOrder = resolveStepOrder(metadata);
    const allDone = stepOrder.every((k) => metadata.steps[k]?.status === 'done');
    if (allDone) {
      metadata.status = 'pending_review';
      metadata.submitted_at = new Date().toISOString();
      await this.openReviewCase(subject.id, externalRef, metadata);
    }

    const updated = await this.prisma.complianceSubject.update({
      where: { externalRef },
      data: {
        displayName: pickDisplayName(metadata, subject.displayName),
        countryCode: pickCountryCode(metadata) ?? subject.countryCode,
        metadata: this.sealMetadata(metadata) as unknown as Prisma.InputJsonValue,
      },
    });

    return this.toPublic(updated, metadata);
  }

  /** Admin decision after KYC/KYB review — unlocks or blocks platform access. */
  async reviewDecision(
    externalRef: string,
    decision: 'approved' | 'rejected',
    reviewerRef?: string,
  ) {
    const subject = await this.prisma.complianceSubject.findUnique({ where: { externalRef } });
    if (!subject) throw NotFoundError('compliance.subject_not_found', `Subject ${externalRef} not found`);

    const metadata = this.hydrateMetadata(subject.metadata);
    if (!metadata) {
      throw ValidationError('compliance.onboarding.not_started', 'Onboarding has not been started');
    }
    if (metadata.status !== 'pending_review') {
      return this.toPublic(subject, metadata);
    }

    const now = new Date().toISOString();
    if (decision === 'approved') {
      metadata.status = 'complete';
      metadata.approved_at = now;
      await this.kyc.setTier(externalRef, VerificationTier.TIER_3, reviewerRef ? `Approved by ${reviewerRef}` : 'Onboarding approved');
    } else {
      metadata.status = 'rejected';
      metadata.rejected_at = now;
      await this.kyc.setTier(externalRef, VerificationTier.TIER_REJECTED, reviewerRef ? `Rejected by ${reviewerRef}` : 'Onboarding rejected');
    }

    const updated = await this.prisma.complianceSubject.update({
      where: { externalRef },
      data: { metadata: this.sealMetadata(metadata) as unknown as Prisma.InputJsonValue },
    });

    this.logger.log(`Onboarding ${decision} for ${externalRef}${reviewerRef ? ` by ${reviewerRef}` : ''}`);
    return this.toPublic(updated, metadata);
  }

  /** Resubmit after rejection when all steps remain complete. */
  async resubmitForReview(externalRef: string) {
    const subject = await this.prisma.complianceSubject.findUnique({ where: { externalRef } });
    if (!subject) throw NotFoundError('compliance.subject_not_found', `Subject ${externalRef} not found`);

    const metadata = this.hydrateMetadata(subject.metadata);
    if (!metadata) {
      throw ValidationError('compliance.onboarding.not_started', 'Onboarding has not been started');
    }
    if (metadata.status !== 'rejected') {
      throw ValidationError('compliance.onboarding.invalid_state', 'Only rejected applications can be resubmitted');
    }

    const stepOrder = resolveStepOrder(metadata);
    const allDone = stepOrder.every((k) => metadata.steps[k]?.status === 'done');
    if (!allDone) {
      throw ValidationError('compliance.onboarding.incomplete', 'Complete all steps before resubmitting');
    }

    metadata.status = 'pending_review';
    metadata.submitted_at = new Date().toISOString();
    metadata.rejected_at = undefined;

    await this.openReviewCase(subject.id, externalRef, metadata);

    const updated = await this.prisma.complianceSubject.update({
      where: { externalRef },
      data: { metadata: this.sealMetadata(metadata) as unknown as Prisma.InputJsonValue },
    });

    return this.toPublic(updated, metadata);
  }

  private async openReviewCase(subjectId: string, externalRef: string, metadata: OnboardingMetadata) {
    const label = metadata.profile === 'business' ? 'KYB' : 'KYC';
    await this.prisma.complianceCase.create({
      data: {
        subjectId,
        status: 'OPEN',
        priority: 'MEDIUM' as CasePriority,
        summary: `${label} onboarding submitted (${metadata.flow}) — review required for ${externalRef}`,
        notes: [
          {
            author: 'system',
            body: 'Progressive onboarding package submitted via configured verification requirements.',
            at: new Date().toISOString(),
          },
        ] as unknown as Prisma.InputJsonValue,
      },
    });
    this.logger.log(`Onboarding review case opened for ${externalRef}`);
  }

  private toPublic(
    subject: { externalRef: string; tier: VerificationTier; displayName: string | null },
    metadata: OnboardingMetadata,
  ) {
    const stepOrder = resolveStepOrder(metadata);
    const steps = stepOrder.map((key) => ({
      key,
      label: stepLabelFromKey(key),
      status: metadata.steps[key]?.status ?? 'pending',
      data: metadata.steps[key]?.data ?? null,
    }));
    const current = steps.find((s) => s.status === 'pending')?.key ?? null;
    const complete = metadata.status === 'complete';

    return {
      external_ref: subject.externalRef,
      required: true,
      profile: metadata.profile,
      flow: metadata.flow,
      status: metadata.status,
      tier: subject.tier,
      display_name: subject.displayName,
      steps,
      requirements: metadata.requirements ?? [],
      current_step: metadata.status === 'pending_review' || metadata.status === 'rejected' ? null : current,
      complete,
      submitted_at: metadata.submitted_at ?? null,
      approved_at: metadata.approved_at ?? null,
      rejected_at: metadata.rejected_at ?? null,
      ocr: metadata.ocr ?? null,
    };
  }
}

function emptyStatus(externalRef: string) {
  return {
    external_ref: externalRef,
    required: false,
    status: 'not_started' as const,
    profile: null,
    steps: [],
    requirements: [],
    current_step: null,
    complete: false,
  };
}

function resolveStepOrder(metadata: OnboardingMetadata): string[] {
  let order: string[];
  if (metadata.step_order?.length) {
    order = [...metadata.step_order];
  } else if (metadata.profile === 'business') {
    order = [...FALLBACK_BUSINESS_STEPS];
  } else {
    order = [...FALLBACK_DEVELOPER_STEPS];
  }

  if (metadata.profile === 'business' && !order.includes('beneficial_owners')) {
    const documentsIdx = order.indexOf('documents');
    if (documentsIdx >= 0) {
      order.splice(documentsIdx + 1, 0, 'beneficial_owners');
    } else {
      order.push('beneficial_owners');
    }
  }

  return order;
}

function parseMetadata(raw: unknown): OnboardingMetadata | null {
  if (!raw || typeof raw !== 'object') return null;
  const m = raw as OnboardingMetadata;
  if (m.version !== 1 || !m.flow || !m.steps) return null;
  return m;
}

function pickDisplayName(metadata: OnboardingMetadata, fallback: string | null): string | null {
  for (const step of Object.values(metadata.steps)) {
    const name = step.data?.legal_name ?? step.data?.full_name;
    if (typeof name === 'string' && name.trim()) return name.trim();
  }
  return fallback;
}

function pickCountryCode(metadata: OnboardingMetadata): string | null {
  for (const step of Object.values(metadata.steps)) {
    const value = step.data?.country;
    if (typeof value === 'string' && value.length === 2) return value.toUpperCase();
  }
  return null;
}

function enrichStepData(
  step: string,
  data: Record<string, unknown>,
  requirements?: RequirementSnapshot[],
): { data: Record<string, unknown>; ocr?: Record<string, unknown> } {
  const stepReqs = requirements?.filter((r) => r.step_key === step) ?? [];
  const docReqs = stepReqs.filter((r) => r.input_type === 'document');

  if (docReqs.length > 0) {
    const enriched: Record<string, unknown> = {};
    const ocr: Record<string, unknown> = {};
    for (const req of docReqs) {
      const ref = documentRef(data[req.field_key]);
      enriched[req.field_key] = ref.meta;
      if (ref.filename) {
        ocr[req.field_key] = simulateOcr(ref.filename, req.field_key);
      }
    }
    const infoFields = stepReqs.filter((r) => r.input_type === 'information');
    for (const req of infoFields) {
      if (data[req.field_key] !== undefined) enriched[req.field_key] = data[req.field_key];
    }
    return { data: enriched, ocr: Object.keys(ocr).length ? ocr : undefined };
  }

  if (step === 'documents') {
    const incorporation = documentRef(data.incorporation_certificate);
    const addressDoc = documentRef(data.proof_of_address);
    return {
      data: {
        incorporation_certificate: incorporation.meta,
        proof_of_address: addressDoc.meta,
      },
      ocr: {
        incorporation_certificate: simulateOcr(incorporation.filename, 'incorporation'),
        proof_of_address: simulateOcr(addressDoc.filename, 'address'),
      },
    };
  }
  if (step === 'identity_documents') {
    const front = documentRef(data.id_front);
    const back = documentRef(data.id_back);
    return {
      data: {
        id_type: String(data.id_type ?? 'passport'),
        id_front: front.meta,
        id_back: back.filename ? back.meta : null,
      },
      ocr: {
        id_front: simulateOcr(front.filename, 'identity'),
        id_back: back.filename ? simulateOcr(back.filename, 'identity_back') : null,
      },
    };
  }
  if (step === 'beneficial_owners') {
    const ownersRaw = data.owners;
    if (!Array.isArray(ownersRaw) || ownersRaw.length === 0) {
      return { data: { owners: [] } };
    }

    const owners: Record<string, unknown>[] = [];
    const ocrEntries: Record<string, unknown>[] = [];

    for (const entry of ownersRaw) {
      if (!entry || typeof entry !== 'object') continue;
      const row = entry as Record<string, unknown>;
      const idCard = documentRef(row.id_card);
      const idBack = documentRef(row.id_card_back);
      const proofOfAddress = documentRef(row.proof_of_address);

      owners.push({
        name: String(row.name ?? '').trim(),
        email: String(row.email ?? '').trim(),
        ownership_pct: String(row.ownership_pct ?? '').trim(),
        id_card: idCard.meta,
        id_card_back: idBack.filename ? idBack.meta : null,
        proof_of_address: proofOfAddress.meta,
      });

      ocrEntries.push({
        id_card: idCard.filename ? simulateOcr(idCard.filename, 'identity') : null,
        id_card_back: idBack.filename ? simulateOcr(idBack.filename, 'identity_back') : null,
        proof_of_address: proofOfAddress.filename ? simulateOcr(proofOfAddress.filename, 'address') : null,
      });
    }

    return {
      data: { owners },
      ocr: ocrEntries.length ? { owners: ocrEntries } : undefined,
    };
  }
  return { data };
}

function documentRef(value: unknown): { filename: string; meta: Record<string, unknown> | null } {
  if (value && typeof value === 'object' && 'filename' in value) {
    const meta = value as Record<string, unknown>;
    return { filename: String(meta.filename ?? ''), meta };
  }
  const filename = typeof value === 'string' ? value.trim() : '';
  return {
    filename,
    meta: filename ? { filename, uploaded_at: new Date().toISOString() } : null,
  };
}

function simulateOcr(filename: string, kind: string): Record<string, unknown> | null {
  if (!filename) return null;
  const base = filename.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ');
  return {
    source_file: filename,
    engine: 'salychain-ocr-stub',
    confidence: 0.92,
    extracted_at: new Date().toISOString(),
    fields:
      kind.includes('incorporation') || kind.includes('incorporation_certificate')
        ? { legal_name: titleCase(base), registration_number: `REG-${ulid().slice(-8)}` }
        : kind.includes('address') || kind.includes('proof')
          ? { address_line: `${titleCase(base)} Street`, city: 'Lagos', country: 'NG' }
          : kind.includes('id') || kind.includes('identity')
            ? { full_name: titleCase(base), document_number: `ID-${ulid().slice(-6)}` }
            : { verified: true },
  };
}

function titleCase(value: string): string {
  return value.replace(/\b\w/g, (c) => c.toUpperCase());
}
