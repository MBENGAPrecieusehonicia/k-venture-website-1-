# docker build -t kventure-app .(Pour build l'image Docker)
# docker run --env-file .env -p 3000:3000 kventure-app (Pour lancer l'application)
# See https://nextjs.org/docs/deployment#docker-image for details
# Install dependencies only when needed
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma
RUN npm install -g pnpm && pnpm install --frozen-lockfile \
    && npx prisma generate

# Rebuild the source code only when needed
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
RUN npm install -g pnpm
COPY . .
RUN npx prisma generate --schema=./prisma/schema.prisma
RUN pnpm build

# Production image, copy all the files and run next
FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
ENV NODE_ENV=production
RUN npm install -g pnpm
# Prisma client & engines
COPY --from=deps /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/generated/prisma ./generated/prisma

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/tailwind.config.ts ./tailwind.config.ts
COPY --from=builder /app/postcss.config.mjs ./postcss.config.mjs
COPY --from=builder /app/tsconfig.json ./tsconfig.json

RUN npx prisma generate --schema=./prisma/schema.prisma

EXPOSE 3000
CMD ["pnpm", "start"]
