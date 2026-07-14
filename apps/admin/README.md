# `@salychain/app-admin`

Super Admin Dashboard for SalyChain. Built with Next.js 15 App Router, TypeScript, Tailwind, and the shared `@salychain/ui` design system.

## Dev

```bash
pnpm install                       # from repo root
pnpm --filter @salychain/app-admin dev
# → http://localhost:3001
```

## Status

- ✅ Dashboard route matching the mock (headline metrics, volume chart, distribution donut, world map placeholder, recent transactions, risk alerts, operational metrics, system + network status)
- ✅ Sidebar + topbar shell consumed across all admin pages
- ✅ Design tokens from `@salychain/ui` (dark violet theme)
- ⏳ Live API integration via `@salychain/sdk-internal` (slice S1)
- ✅ Spend approval queue at `/approvals` with one-click **Approve** (requires `ADMIN_APPROVER_USER_ID`)
- ⏳ Interactive transaction inspector
- ⏳ Real interactive world map (drop in `react-simple-maps`)
