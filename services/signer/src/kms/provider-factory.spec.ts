import { describe, expect, it } from 'vitest';
import { buildAwsWrappingKeyRef, parseAwsWrappingKeyRef } from './aws-kms.provider.js';

describe('parseAwsWrappingKeyRef', () => {
  it('round-trips key id and region', () => {
    const keyId = 'arn:aws:kms:eu-west-1:123456789012:key/abcd-efgh';
    const ref = buildAwsWrappingKeyRef('eu-west-1', keyId);
    const parsed = parseAwsWrappingKeyRef(ref);
    expect(parsed).toEqual({ region: 'eu-west-1', keyId });
  });

  it('returns null for unknown refs', () => {
    expect(parseAwsWrappingKeyRef('local:v1')).toBeNull();
  });
});
