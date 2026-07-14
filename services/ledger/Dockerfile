FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate
WORKDIR /workspace

FROM base AS deps
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json turbo.json tsconfig.base.json ./
COPY services/ledger/package.json services/ledger/package.json
COPY packages packages
RUN pnpm install --frozen-lockfile

FROM base AS build
COPY --from=deps /workspace /workspace
COPY services/ledger services/ledger
WORKDIR /workspace/services/ledger
RUN pnpm prisma generate
RUN pnpm build

FROM node:20-alpine AS runtime
RUN apk add --no-cache tini
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /workspace/services/ledger/dist ./dist
COPY --from=build /workspace/services/ledger/node_modules ./node_modules
COPY --from=build /workspace/services/ledger/prisma ./prisma
COPY --from=build /workspace/services/ledger/package.json ./package.json
EXPOSE 4001
USER node
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "dist/main.js"]
