/** keccak256 schema identifiers for SalyAttestationRegistry (off-chain computed, stored as hex). */
export const VERTICAL_SCHEMAS = {
  HEALTH_CONSENT: 'healthcare.consent.v1',
  HEALTH_RECORD: 'healthcare.record.v1',
  EDU_CREDENTIAL: 'education.credential.v1',
  GOV_PUBLIC_RECORD: 'government.public_record.v1',
  AGRI_PRODUCE_LOT: 'agriculture.produce_lot.v1',
  AGRI_QUALITY_CERT: 'agriculture.quality_cert.v1',
  AVIATION_MAINTENANCE: 'aviation.maintenance.v1',
  AVIATION_AIRWORTHINESS: 'aviation.airworthiness.v1',
  SCM_CUSTODY: 'scm.custody.v1',
  SCM_TRADE_DOC: 'scm.trade_doc.v1',
  AGENT_CAPABILITY: 'agents.capability.v1',
} as const;

export type VerticalSchemaId = (typeof VERTICAL_SCHEMAS)[keyof typeof VERTICAL_SCHEMAS];
