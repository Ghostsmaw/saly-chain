# ADR-0019 — SalySD native stablecoin and reserve oracle

## Status

Accepted (Milestone D4)

## Context

SalyChain's L3 money rail today uses **SalyTestUSDC** — a devnet-only faucet token — or external USDC resolved via manifest. Milestone D requires an **owned, reserve-backed stablecoin** (`SalySD`) with:

- Mint only when off-chain reserves justify new supply (proof-of-reserves).
- Redeem (burn) as the on-chain unwind of fiat/reserve payout.
- Emergency controls (pause, blocklist) without breaking treasury mint/burn.
- Integration with the existing intent → execution → ledger pipeline (D5).

## Decision

### 1. `SalySD` ERC-20 (`contracts/salysd/`)

- **6 decimals** — matches USDC minor-unit math across `packages/money` and chain adapters.
- **OpenZeppelin base:** `ERC20`, `ERC20Permit`, `ERC20Pausable`, `AccessControl`, `Ownable2Step`.
- **Blocklist** — custom `_update` hook; blocked addresses cannot send/receive; mint/burn paths exempt.
- **Roles:**
  - `MINTER_ROLE` — may call `mint(to, amount)` when oracle ceiling allows.
  - `BURNER_ROLE` — may call `burn(from, amount)` on redeem unwind.
  - `PAUSER_ROLE` — pause/unpause transfers.
  - `BLOCKLIST_ADMIN_ROLE` — update blocklist.
  - `DEFAULT_ADMIN_ROLE` — grant/revoke roles; two-step ownership transfer.

### 2. `IReserveOracle` + `ReserveOracle`

- Off-chain attestation (custodian balance, auditor signature) is summarized on-chain as:
  - `authorizedMintCeiling` — max allowed `totalSupply()` after mints.
  - `reserveAttestationHash` — commitment to the latest PoR document.
  - `lastAttestationAt` — timestamp for staleness alerts.
- `SalySD.mint` reverts if `totalSupply() + amount > oracle.authorizedMintCeiling()`.
- Production: oracle owner = multisig/timelock; attestation updates require dual control.

### 3. Service layer (`services/stablecoin`, D5)

- Durable rows: `reserve_account`, `mint_request`, `redeem_request`, `supply_snapshot`, `reserve_attestation`.
- Mint flow: compliance/risk → reserve check → on-chain mint → ledger credit circulation.
- Redeem flow: burn on-chain → fiat/reserve payout via execution (C2 rail).
- Events on `SALYCHAIN_STABLECOIN` NATS stream.

### 4. Deployment targets

| Network | Token | Notes |
|---------|-------|-------|
| `saly-devnet` | `SalyTestUSDC` | Keep for rail dev; no SalySD |
| `saly-testnet` | `SalySD` | First production-shaped deploy |
| `saly-mainnet` | `SalySD` | After D6 audit |

## Security properties

1. **Fail closed:** mint without oracle headroom reverts; service rejects stale attestations.
2. **No public faucet** on SalySD (unlike SalyTestUSDC).
3. **Pause** stops transfers, not role-gated mint/burn (treasury can still unwind in crisis).
4. **Blocklist** supports sanctions compliance without destroying supply.
5. **Idempotency** on mint/redeem requests at service + execution layers.

## Consequences

- Execution gains `SALYSD_MINT` / `SALYSD_REDEEM` kinds (D5).
- Ledger adds circulation vs reserve liability accounts for SalySD.
- Analytics supply API extends beyond USDC.
- `SalyTestUSDC` remains devnet-only; testnet/mainnet use SalySD.

## Alternatives considered

| Alternative | Why rejected |
|-------------|--------------|
| Upgradeable proxy (UUPS) | Adds admin key risk; immutable + timelock roles preferred for v1 |
| Algorithmic stablecoin | Out of scope; fiat/reserve backed only |
| Mint without on-chain oracle | Cannot enforce supply cap at chain layer |
| Circle USDC as "native" | Not owned; Milestone D exit requires owned asset |

## References

- [08-milestone-d-plan.md](../architecture/08-milestone-d-plan.md)
- [05-technical-implementation.md §3.4](../architecture/05-technical-implementation.md)
- [ADR-0017 L3 money rail](0017-l3-money-rail.md)
- [ADR-0016 OP-Stack L3](0016-op-stack-l3-sequencer-design.md)
