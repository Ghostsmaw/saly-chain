export interface CustodianBalance {
  balanceMinor: bigint;
  authorizedCeilingMinor: bigint;
}

export interface CustodianAdapter {
  fetchBalance(): Promise<CustodianBalance>;
}

/** Static balance for dev/staging when no custodian API exists. */
export class StaticCustodianAdapter implements CustodianAdapter {
  constructor(
    private readonly balanceMinor: bigint,
    private readonly authorizedCeilingMinor: bigint,
  ) {}

  fetchBalance(): Promise<CustodianBalance> {
    return Promise.resolve({
      balanceMinor: this.balanceMinor,
      authorizedCeilingMinor: this.authorizedCeilingMinor,
    });
  }
}

/** HTTP custodian balance feed (JSON: { balance_minor, authorized_ceiling_minor }). */
export class HttpCustodianAdapter implements CustodianAdapter {
  constructor(
    private readonly url: string,
    private readonly headers: Record<string, string> = {},
  ) {}

  async fetchBalance(): Promise<CustodianBalance> {
    const res = await fetch(this.url, { headers: this.headers, signal: AbortSignal.timeout(15_000) });
    if (!res.ok) throw new Error(`Custodian API ${res.status}: ${await res.text()}`);
    const body = (await res.json()) as { balance_minor: string; authorized_ceiling_minor: string };
    return {
      balanceMinor: BigInt(body.balance_minor),
      authorizedCeilingMinor: BigInt(body.authorized_ceiling_minor),
    };
  }
}
