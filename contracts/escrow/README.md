# `@salychain/contracts-escrow`

Conditional ERC-20 escrow contracts. Used by the routing service when a payment requires a release condition (e.g. "release on delivery confirmation", "refund if not delivered within 7 days").

## Why on-chain escrow

For internal-to-internal payments we use the ledger. For chain payouts we send funds straight to the destination. **Conditional** payments — where the payer wants assurance that release only happens on a condition, OR where the payee wants the funds visible on-chain pre-release — need a contract.

We deliberately keep this contract minimal:

* One contract per chain (singleton; not per-deal).
* Deal id is supplied off-chain (ULID-derived) so the SalyChain backend correlates without storing extra state.
* `resolver` is the SalyChain operator key (a small multisig in prod). It can release or refund at any time.
* `deadline` provides a safety net: after the deadline, **anyone** can trigger a refund. This means even if the resolver key is compromised, payer funds aren't held forever.

See [ADR-0014 (S3) — on-chain escrow as a primitive](../../docs/adr/0014-escrow-contract-primitive.md) for the full design rationale.

## Build & test

```bash
# install foundry if you haven't (https://book.getfoundry.sh/getting-started/installation)
curl -L https://foundry.paradigm.xyz | bash && foundryup

# inside contracts/escrow
forge install openzeppelin/openzeppelin-contracts --no-commit
forge install foundry-rs/forge-std --no-commit
forge build
forge test -vvv
```

## Deploy

```bash
RESOLVER_ADDRESS=0x… BASE_RPC_URL=… PRIVATE_KEY=… \
  forge script script/Deploy.s.sol --rpc-url base-sepolia --broadcast --verify
```

The deployed address is then wired into `services/execution` via `ESCROW_CONTRACT_ADDRESS_BASE` and the routing service starts using it for conditional payments.

## Security notes

* **No upgrade path.** This is intentional. Rotating the resolver = redeploy + migrate. Upgradeable escrow is a foot-gun; we'd rather force the operational pain than ship an upgradeability vector.
* **Fee-on-transfer tokens are rejected** at fund time (we balance-diff the received amount).
* **Re-entrancy guard** on every state-mutating external entry.
* **No native ETH/value path** — the escrow only handles ERC-20 (USDC is the immediate use case). Native value escrow lands later.
* **No support for partial release.** A deal is fully released or fully refunded. Partial flows are modelled as N separate deals upstream.

Audit posture: this is "starter" code suitable for testnet only. A full external audit is gated on the first production deployment.
