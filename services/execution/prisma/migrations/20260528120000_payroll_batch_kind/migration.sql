-- Add PAYROLL_BATCH to execution transaction kinds (and ESCROW if missing on older DBs)
ALTER TYPE "ExecutionTransactionKind" ADD VALUE IF NOT EXISTS 'ESCROW_PAYOUT';
ALTER TYPE "ExecutionTransactionKind" ADD VALUE IF NOT EXISTS 'PAYROLL_BATCH';
