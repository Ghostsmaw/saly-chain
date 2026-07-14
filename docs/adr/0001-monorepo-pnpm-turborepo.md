# ADR-0001: Monorepo with pnpm + Turborepo

- **Status:** Accepted
- **Date:** 2026-05-28

## Context
SalyChain spans ~15 backend services, 3 frontend apps, ~10 shared packages, Solidity contracts, and infra. Multiple repos would create version drift in shared types (especially the intent schema and money helpers), slow refactors, and complicate CI.

## Decision
Single monorepo using **pnpm workspaces** + **Turborepo** for task orchestration and remote caching.

## Consequences
- ✅ Shared types and intent schema have a single source of truth.
- ✅ Atomic cross-service refactors via single PR.
- ✅ Turborepo's remote cache makes CI fast at scale.
- ⚠️ Requires discipline on dependency boundaries (enforced via `eslint-plugin-boundaries` and `package.json` `dependencies` allowlists).
- ⚠️ Single git history grows large — mitigated by sparse checkout for CI runners.

## Alternatives considered
- **Nx**: equally viable; Turborepo chosen for simpler mental model and lighter config.
- **Multi-repo with submodules**: rejected — version drift on `@salychain/types` would be a constant source of bugs.
