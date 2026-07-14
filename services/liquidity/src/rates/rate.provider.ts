export interface RateQuote {
  /** Mid-market rate scaled by 1e8 (8 decimal places). */
  midRate1e8: bigint;
  provider: string;
  capturedAt: Date;
}

export interface RateProvider {
  readonly name: string;
  getMidRate(base: string, quote: string): Promise<RateQuote>;
}
