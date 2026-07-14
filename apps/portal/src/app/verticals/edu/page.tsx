import { Card, CardHeader, Chip } from '@salychain/ui';
import { PortalShell } from '@/components/PortalShell';
import { DisburseScholarshipButton } from '@/components/verticals/DisburseScholarshipButton';
import { VerticalEmptyState } from '@/components/verticals/VerticalEmptyState';
import { VerticalFlash } from '@/components/verticals/VerticalFlash';
import { VerticalSubmitButton } from '@/components/verticals/VerticalSubmitButton';
import { verticalInputClass } from '@/components/verticals/form-styles';
import { issueEduCredentialAction, registerEduInstitutionAction } from '@/app/verticals/actions';
import {
  fetchEduCredentials,
  fetchEduInstitutions,
  fetchEduScholarships,
  formatMinorAmount,
} from '@/lib/verticals';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PortalEduPage({
  searchParams,
}: {
  searchParams?: Promise<{ ok?: string; error?: string }>;
}) {
  const resolved = await searchParams;
  const [institutionsRes, credentialsRes, scholarshipsRes] = await Promise.all([
    fetchEduInstitutions(),
    fetchEduCredentials(),
    fetchEduScholarships(),
  ]);
  const institutions = institutionsRes.data;
  const credentials = credentialsRes.data;
  const scholarships = scholarshipsRes.data;

  return (
    <PortalShell title="Education" subtitle="Institutions, credentials, and scholarships for your organization.">
      <VerticalFlash ok={resolved?.ok} error={resolved?.error} />
      <Card className="mb-6">
        <CardHeader title="Register institution" />
        <form action={registerEduInstitutionAction} className="grid gap-3 p-4 pt-0 md:grid-cols-3">
          <input name="name" required placeholder="Institution name" className={verticalInputClass} />
          <VerticalSubmitButton label="Register" />
        </form>
      </Card>
      <Card className="mb-6">
        <CardHeader title="Issue credential" />
        <form action={issueEduCredentialAction} className="grid gap-3 p-4 pt-0 md:grid-cols-5">
          <select name="institution_id" required className={verticalInputClass} defaultValue="">
            <option value="" disabled>Institution</option>
            {institutions.map((i) => (
              <option key={i.id} value={i.id}>{i.name}</option>
            ))}
          </select>
          <input name="learner_ref" required placeholder="Learner ref" className={verticalInputClass} />
          <select name="type" className={verticalInputClass} defaultValue="CERTIFICATE">
            <option value="DEGREE">DEGREE</option>
            <option value="CERTIFICATE">CERTIFICATE</option>
            <option value="BADGE">BADGE</option>
          </select>
          <input name="program" required placeholder="Program" className={verticalInputClass} />
          <VerticalSubmitButton label="Issue" />
        </form>
      </Card>
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader title="Credentials" right={<Chip tone={institutionsRes.source === 'live' ? 'success' : 'neutral'}>{institutionsRes.source}</Chip>} />
          {institutionsRes.source !== 'live' ? (
            <VerticalEmptyState message="Edu service offline (port 4029)." />
          ) : credentials.length === 0 ? (
            <VerticalEmptyState message="No credentials yet." />
          ) : (
            <ul className="divide-y divide-surface-divider px-4 pb-4 text-sm">
              {credentials.map((c) => (
                <li key={c.id} className="py-2">{c.institutionName} — {c.type} ({c.status})</li>
              ))}
            </ul>
          )}
        </Card>
        <Card>
          <CardHeader title="Scholarships" subtitle={`${scholarships.length} grants`} />
          {scholarships.length === 0 ? (
            <VerticalEmptyState message="No scholarships yet." />
          ) : (
            <ul className="divide-y divide-surface-divider px-4 pb-4 text-sm">
              {scholarships.map((s) => (
                <li key={s.id} className="flex items-center justify-between gap-4 py-2">
                  <span>{s.milestone} — {formatMinorAmount(s.amountMinor, s.currency)} ({s.status})</span>
                  {s.status !== 'DISBURSED' ? <DisburseScholarshipButton grantId={s.id} /> : null}
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </PortalShell>
  );
}
