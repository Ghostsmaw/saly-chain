FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate
WORKDIR /workspace

FROM base AS deps
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json turbo.json tsconfig.base.json ./
COPY services/workers/fiat-listener/package.json services/workers/fiat-listener/package.json
COPY packages packages
RUN pnpm install --frozen-lockfile

FROM base AS build
COPY --from=deps /workspace /workspace
COPY services/workers/fiat-listener services/workers/fiat-listener
WORKDIR /workspace/services/workers/fiat-listener
RUN pnpm prisma generate
RUN pnpm build

FROM node:20-alpine AS runtime
RUN apk add --no-cache tini
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /workspace/services/workers/fiat-listener/dist ./dist
COPY --from=build /workspace/services/workers/fiat-listener/node_modules ./node_modules
COPY --from=build /workspace/services/workers/fiat-listener/prisma ./prisma
COPY --from=build /workspace/services/workers/fiat-listener/package.json ./package.json
USER node
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "dist/main.js"]
