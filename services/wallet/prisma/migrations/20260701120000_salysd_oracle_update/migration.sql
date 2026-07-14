-- Milestone D6: ReserveOracle on-chain attestation updates from PoR worker.
ALTER TYPE "BroadcastJobKind" ADD VALUE IF NOT EXISTS 'SALYSD_ORACLE_UPDATE';
