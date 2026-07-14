# D3 — L3 production infra (HA sequencer + public RPC)

Operational runbook for Milestone D3: Conductor HA, RPC fleet, fault-proof settlement.

## Architecture

```text
                    ┌─────────────────┐
  Public clients ──►│ l3-rpc-gateway  │ (read-only, rate-limited)
                    └────────┬────────┘
                             │ round-robin
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
        op-geth-rep1   op-geth-rep2   op-geth-seq ◄── Conductor leader
              │              │              │
              └──────────────┴──────────────┘
                             │
                    op-node (HA) + op-batcher
                             │
                    Base mainnet (DisputeGameFactory)
```

## Components

| Component | Package / image | Port |
|-----------|-----------------|------|
| Conductor (×3) | `op-conductor` | 8555–8557 |
| Sequencer geth | `op-geth` | 9545 (internal) |
| Read replicas | `op-geth` | 9548, 9549 |
| RPC gateway | `@salychain/worker-l3-rpc-gateway` | 9520 |
| Ops monitor | `@salychain/worker-l3-ops-monitor` | 9106 health |
| Rollup monitor | `@salychain/worker-l3-rollup-monitor` | 4098 health |

## Bootstrap

```bash
pnpm l3:production:bootstrap
# Edit infra/l3/production/.env — KMS-backed keys, never hot keys in git
# Edit deployments.base-mainnet.json after op-deployer
pnpm l3:production:preflight
pnpm l3:production:apply          # preflight → mainnet deploy → HA up → verify
# Or step-by-step:
pnpm l3:production:deploy:mainnet
pnpm l3:production:up
```

## Environment (production)

```bash
L3_NETWORK=saly-mainnet
L3_SETTLEMENT_MODE=fault_proofs
L3_DISPUTE_GAME_FACTORY=0x...
L3_RPC_UPSTREAM_URLS=http://op-geth-replica-1:8545,http://op-geth-replica-2:8545
L3_CONDUCTOR_URLS=http://127.0.0.1:8555,http://127.0.0.1:8556,http://127.0.0.1:8557
L3_RPC_RATE_LIMIT_PER_MIN=600
```

## Verify gate

```bash
L3_NETWORK=saly-mainnet pnpm l3:verify:production
```

Exit requires: settlement configured, Conductor leader, RPC pool healthy, ops monitor up.

## Security

- **Sequencer/batcher/proposer keys** are isolated from custodial wallet keys (ADR-0005).
- Public RPC gateway **blocks** `eth_sendRawTransaction` and admin/debug namespaces.
- Per-IP rate limits fail closed (HTTP 429).
- Conductor raft requires **odd** member count (3) for quorum.
- Read replicas serve public traffic; sequencer RPC stays internal.

## On-call alerts

| Alert | Meaning | Action |
|-------|---------|--------|
| `L3ConductorNoLeader` | Raft lost leader | Check conductor pods, disk, network |
| `L3RpcPoolLagHigh` | Replica drift | Restart lagging replica, check sequencer |
| `L3SettlementProposalStalled` | No new fault-proof game | Check proposer funding, L1 RPC |
| `L3SequencerLagHigh` | Execution lag | Inspect batcher, L1 DA costs |

## Kubernetes

Deploy workers via main Helm chart (`values-prod.yaml`). OP-Stack stateful services use `infra/helm/l3-stack/` (official OP images + PVCs).

```bash
helm upgrade --install l3-stack infra/helm/l3-stack -f infra/helm/l3-stack/values-prod.yaml
```

## Related

- [ADR-0016](../adr/0016-op-stack-l3-sequencer-design.md)
- [D1 testnet runbook](d1-l3-testnet.md)
- [D2 bridge runbook](d2-l3-bridge.md)
