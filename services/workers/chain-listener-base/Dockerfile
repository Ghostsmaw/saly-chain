FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate
WORKDIR /workspace

FROM base AS deps
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json turbo.json tsconfig.base.json ./
COPY services/workers/chain-listener-base/package.json services/workers/chain-listener-base/package.json
COPY packages packages
RUN pnpm install --frozen-lockfile

FROM base AS build
COPY --from=deps /workspace /workspace
COPY services/workers/chain-listener-base services/workers/chain-listener-base
WORKDIR /workspace/services/workers/chain-listener-base
RUN pnpm prisma generate
RUN pnpm build

FROM node:20-alpine AS runtime
RUN apk add --no-cache tini
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /workspace/services/workers/chain-listener-base/dist ./dist
COPY --from=build /workspace/services/workers/chain-listener-base/node_modules ./node_modules
COPY --from=build /workspace/services/workers/chain-listener-base/prisma ./prisma
COPY --from=build /workspace/services/workers/chain-listener-base/package.json ./package.json
USER node
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "dist/main.js"]
