-- SalySD mint/redeem execution kinds (Milestone D5)
ALTER TYPE "ExecutionTransactionKind" ADD VALUE IF NOT EXISTS 'SALYSD_MINT';
ALTER TYPE "ExecutionTransactionKind" ADD VALUE IF NOT EXISTS 'SALYSD_REDEEM';
