import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import {
  AuditTone,
  RequirementInputType,
  RoleTone,
  VerificationCategory,
} from '../generated/prisma/index.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(private readonly prisma: PrismaService) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.ensureVerificationRequirements();

    const settings = await this.prisma.platformSettings.findUnique({ where: { id: 'default' } });
    if (settings) return;

    const now = new Date();
    const minutesAgo = (m: number) => new Date(now.getTime() - m * 60_000);
    const hoursAgo = (h: number) => new Date(now.getTime() - h * 3_600_000);

    await this.prisma.$transaction([
      this.prisma.platformSettings.create({
        data: {
          id: 'default',
          orgName: 'SalyChain',
          supportEmail: 'support@salychain.io',
          region: 'Global · Multi-region',
          enforceMfa: true,
          ipAllowlist: false,
          ssoEnabled: true,
          sessionTimeout: true,
          notifyRisk: true,
          notifySettlements: true,
          notifyDigest: false,
        },
      }),
      this.prisma.adminMember.createMany({
        data: [
          { id: 'm1', name: 'Sarah Chen', email: 'sarah.chen@salychain.io', roleName: 'Owner', mfaEnabled: true, lastActiveAt: minutesAgo(2) },
          { id: 'm2', name: 'Marcus Webb', email: 'marcus.webb@salychain.io', roleName: 'Platform Admin', mfaEnabled: true, lastActiveAt: minutesAgo(18) },
          { id: 'm3', name: 'Lena Hoffmann', email: 'lena.h@salychain.io', roleName: 'Compliance Officer', mfaEnabled: true, lastActiveAt: hoursAgo(1) },
          { id: 'm4', name: 'Dev Sharma', email: 'dev.sharma@salychain.io', roleName: 'Risk Analyst', mfaEnabled: false, lastActiveAt: hoursAgo(3) },
          { id: 'm5', name: 'Tomás Rivera', email: 'tomas.r@salychain.io', roleName: 'Support Lead', mfaEnabled: true, lastActiveAt: hoursAgo(5) },
        ],
      }),
      this.prisma.rbacRole.createMany({
        data: [
          { id: 'r_owner', name: 'Owner', memberCount: 1, tone: RoleTone.BRAND, permissions: ['Full platform access', 'Billing & contracts', 'Manage admins', 'Break-glass access'] },
          { id: 'r_admin', name: 'Platform Admin', memberCount: 3, tone: RoleTone.SUCCESS, permissions: ['Manage businesses & users', 'Feature flags', 'View all transactions', 'Trigger settlements'] },
          { id: 'r_compliance', name: 'Compliance Officer', memberCount: 4, tone: RoleTone.WARNING, permissions: ['Review KYC cases', 'Approve / reject screening', 'Export audit logs', 'Freeze accounts'] },
          { id: 'r_risk', name: 'Risk Analyst', memberCount: 6, tone: RoleTone.DANGER, permissions: ['View risk assessments', 'Tune thresholds (proposed)', 'Flag actors', 'Read-only ledger'] },
          { id: 'r_support', name: 'Support', memberCount: 9, tone: RoleTone.SUCCESS, permissions: ['View user profiles', 'Resend receipts', 'Open tickets', 'Read-only transactions'] },
        ],
      }),
      this.prisma.featureFlag.createMany({
        data: [
          { id: 'f1', key: 'saly_token_launch', name: '$SALY token launch', description: 'Activate the $SALY ERC-20 + staking surfaces platform-wide', enabled: false, scope: 'Global' },
          { id: 'f2', key: 'l3_money_rail', name: 'L3 money rail', description: 'Route eligible payouts through the L3 rollup', enabled: true, scope: 'Global' },
          { id: 'f3', key: 'on_chain_dex_quotes', name: 'On-chain DEX quotes', description: 'Uniswap V3 QuoterV2 pricing for crypto swaps', enabled: true, scope: 'Liquidity' },
          { id: 'f4', key: 'agentic_spend_approvals', name: 'Agentic spend approvals', description: 'Multi-approver high-value spend gating for AI agents', enabled: true, scope: 'Agents' },
          { id: 'f5', key: 'new_onboarding_flow', name: 'New onboarding flow', description: 'Progressive KYB with document OCR', enabled: false, scope: 'Beta' },
          { id: 'f6', key: 'webhook_v2_signing', name: 'Webhook v2 signing', description: 'Ed25519 webhook signatures (rotating from HMAC)', enabled: false, scope: 'Beta' },
        ],
      }),
      this.prisma.auditEntry.createMany({
        data: [
          { id: 'al1', actor: 'sarah.chen', action: 'Updated feature flag', target: 'L3 money rail → enabled', tone: AuditTone.BRAND, createdAt: minutesAgo(14) },
          { id: 'al2', actor: 'lena.h', action: 'Resolved compliance case', target: 'case_8f21 (cleared)', tone: AuditTone.SUCCESS, createdAt: minutesAgo(52) },
          { id: 'al3', actor: 'marcus.webb', action: 'Triggered batch settlement', target: '1,204 NGN payouts', tone: AuditTone.BRAND, createdAt: hoursAgo(1) },
          { id: 'al4', actor: 'dev.sharma', action: 'Flagged actor', target: 'act_9f2 (velocity)', tone: AuditTone.WARNING, createdAt: hoursAgo(2) },
          { id: 'al5', actor: 'lena.h', action: 'Froze account', target: 'usr_0q7 (sanctions hit)', tone: AuditTone.DANGER, createdAt: hoursAgo(3) },
          { id: 'al6', actor: 'sarah.chen', action: 'Invited admin', target: 'tomas.r@salychain.io', tone: AuditTone.NEUTRAL, createdAt: hoursAgo(6) },
        ],
      }),
    ]);
  }

  private async ensureVerificationRequirements(): Promise<void> {
    try {
      const count = await this.prisma.verificationRequirement.count();
      if (count > 0) return;

      await this.prisma.verificationRequirement.createMany({
        data: [
          // KYB — business information
          { id: 'vr_legal_name', slug: 'legal-name', label: 'Legal business name', category: VerificationCategory.KYB, inputType: RequirementInputType.INFORMATION, fieldKey: 'legal_name', stepKey: 'business_details', valueFormat: 'text', sortOrder: 10, targetBusiness: true, targetDeveloper: false, isActive: true },
          { id: 'vr_trading_name', slug: 'trading-name', label: 'Trading name', category: VerificationCategory.KYB, inputType: RequirementInputType.INFORMATION, fieldKey: 'trading_name', stepKey: 'business_details', valueFormat: 'text', sortOrder: 11, targetBusiness: true, targetDeveloper: false, isActive: true },
          { id: 'vr_biz_country', slug: 'business-country', label: 'Country (ISO code)', category: VerificationCategory.KYB, inputType: RequirementInputType.INFORMATION, fieldKey: 'country', stepKey: 'business_details', valueFormat: 'country', placeholder: 'NG', sortOrder: 12, targetBusiness: true, targetDeveloper: false, isActive: true },
          { id: 'vr_reg_number', slug: 'registration-number', label: 'Registration number', category: VerificationCategory.KYB, inputType: RequirementInputType.INFORMATION, fieldKey: 'registration_number', stepKey: 'business_details', valueFormat: 'text', sortOrder: 13, targetBusiness: true, targetDeveloper: false, isActive: true },
          { id: 'vr_biz_type', slug: 'business-type', label: 'Business type', category: VerificationCategory.KYB, inputType: RequirementInputType.INFORMATION, fieldKey: 'business_type', stepKey: 'business_details', valueFormat: 'text', placeholder: 'LLC, Ltd, etc.', sortOrder: 14, targetBusiness: true, targetDeveloper: false, isActive: true },
          // KYB — documents
          { id: 'vr_incorp_cert', slug: 'incorporation-certificate', label: 'Certificate of incorporation', category: VerificationCategory.KYB, inputType: RequirementInputType.DOCUMENT, fieldKey: 'incorporation_certificate', stepKey: 'documents', accept: '.pdf,.jpg,.jpeg,.png', sortOrder: 20, targetBusiness: true, targetDeveloper: false, isActive: true },
          { id: 'vr_proof_addr', slug: 'proof-of-address', label: 'Proof of address', category: VerificationCategory.KYB, inputType: RequirementInputType.DOCUMENT, fieldKey: 'proof_of_address', stepKey: 'documents', accept: '.pdf,.jpg,.jpeg,.png', sortOrder: 21, targetBusiness: true, targetDeveloper: false, isActive: true },
          // KYB — beneficial owners use the multi-owner onboarding form (not flat requirements)
          // KYC — personal
          { id: 'vr_full_name', slug: 'full-name', label: 'Full legal name', category: VerificationCategory.KYC, inputType: RequirementInputType.INFORMATION, fieldKey: 'full_name', stepKey: 'personal_details', valueFormat: 'text', sortOrder: 10, targetBusiness: false, targetDeveloper: true, isActive: true },
          { id: 'vr_dob', slug: 'date-of-birth', label: 'Date of birth', category: VerificationCategory.KYC, inputType: RequirementInputType.INFORMATION, fieldKey: 'date_of_birth', stepKey: 'personal_details', valueFormat: 'date', sortOrder: 11, targetBusiness: false, targetDeveloper: true, isActive: true },
          { id: 'vr_nationality', slug: 'nationality', label: 'Nationality', category: VerificationCategory.KYC, inputType: RequirementInputType.INFORMATION, fieldKey: 'nationality', stepKey: 'personal_details', valueFormat: 'text', placeholder: 'NG', sortOrder: 12, targetBusiness: false, targetDeveloper: true, isActive: true },
          { id: 'vr_res_country', slug: 'residence-country', label: 'Country of residence', category: VerificationCategory.KYC, inputType: RequirementInputType.INFORMATION, fieldKey: 'country', stepKey: 'personal_details', valueFormat: 'country', placeholder: 'NG', sortOrder: 13, targetBusiness: false, targetDeveloper: true, isActive: true },
          // KYC — identity docs
          { id: 'vr_id_front', slug: 'id-front', label: 'ID front scan', category: VerificationCategory.KYC, inputType: RequirementInputType.DOCUMENT, fieldKey: 'id_front', stepKey: 'identity_documents', accept: '.pdf,.jpg,.jpeg,.png', sortOrder: 20, targetBusiness: false, targetDeveloper: true, isActive: true },
          { id: 'vr_id_back', slug: 'id-back', label: 'ID back scan', category: VerificationCategory.KYC, inputType: RequirementInputType.DOCUMENT, fieldKey: 'id_back', stepKey: 'identity_documents', accept: '.pdf,.jpg,.jpeg,.png', sortOrder: 21, targetBusiness: false, targetDeveloper: true, isActive: false },
          // KYC — address
          { id: 'vr_street', slug: 'street-address', label: 'Street address', category: VerificationCategory.KYC, inputType: RequirementInputType.INFORMATION, fieldKey: 'street', stepKey: 'address', valueFormat: 'text', sortOrder: 30, targetBusiness: false, targetDeveloper: true, isActive: true },
          { id: 'vr_city', slug: 'city', label: 'City', category: VerificationCategory.KYC, inputType: RequirementInputType.INFORMATION, fieldKey: 'city', stepKey: 'address', valueFormat: 'text', sortOrder: 31, targetBusiness: false, targetDeveloper: true, isActive: true },
          { id: 'vr_postal', slug: 'postal-code', label: 'Postal code', category: VerificationCategory.KYC, inputType: RequirementInputType.INFORMATION, fieldKey: 'postal_code', stepKey: 'address', valueFormat: 'text', sortOrder: 32, targetBusiness: false, targetDeveloper: true, isActive: true },
          { id: 'vr_addr_country', slug: 'address-country', label: 'Country', category: VerificationCategory.KYC, inputType: RequirementInputType.INFORMATION, fieldKey: 'country', stepKey: 'address', valueFormat: 'country', placeholder: 'NG', sortOrder: 33, targetBusiness: false, targetDeveloper: true, isActive: true },
        ],
      });
    } catch {
      // Migrations may not be applied yet.
    }
  }
}
