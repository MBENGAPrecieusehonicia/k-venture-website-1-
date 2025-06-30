# Étape 1: Installation des dépendances
FROM node:20-alpine AS deps
WORKDIR /app

# Installer pnpm
RUN npm install -g pnpm

# Copier les fichiers de dépendances
COPY package.json pnpm-lock.yaml ./

# Installer TOUTES les dépendances (dev et prod) nécessaires pour le build
RUN pnpm install --frozen-lockfile

# Étape 2: Construction de l'application
FROM deps AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm prisma generate

# Lancer les migrations de la base de données ici, pendant le build
RUN pnpm prisma migrate deploy

RUN pnpm build

# Étape 3: Image finale de production
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copier les fichiers de build depuis l'étape 'builder'
# On a besoin du schema prisma pour lancer les migrations
COPY --from=builder /app/prisma ./prisma
# On a besoin de package.json et pnpm-lock.yaml pour que pnpm trouve la dépendance prisma
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

COPY --from=builder /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

# Utiliser un utilisateur non-root pour la production pour plus de sécurité
USER node

EXPOSE 3000
CMD ["pnpm", "start"]