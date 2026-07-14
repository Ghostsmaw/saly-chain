-- Add FIAT_PAYOUT execution kind for bank-rail settlements.
ALTER TYPE "ExecutionTransactionKind" ADD VALUE IF NOT EXISTS 'FIAT_PAYOUT';
