# Étape 1: Installation des dépendances
FROM node:20-alpine AS deps
WORKDIR /app

# Installer pnpm
RUN npm install -g pnpm

# Copier les fichiers de dépendances
COPY package.json pnpm-lock.yaml .npmrc ./

# Le .npmrc est utilisé par pnpm pour autoriser les scripts de build
# Installer TOUTES les dépendances (dev et prod) nécessaires pour le build
RUN pnpm install --frozen-lockfile

# Étape 2: Construction de l'application
FROM deps AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm prisma generate

# Acceptez les URLs comme des arguments de build
ARG DATABASE_URL
ARG DIRECT_URL

# Exposez-les comme des variables d'environnement pour les commandes RUN suivantes
ENV DATABASE_URL=$DATABASE_URL
ENV DIRECT_URL=$DIRECT_URL

# Lancer les migrations de la base de données ici, pendant le build
RUN pnpm prisma migrate deploy

RUN pnpm build

# Étape 3: Image finale de production
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copier uniquement les fichiers nécessaires à l'exécution depuis le builder
COPY --from=builder /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

# Utiliser un utilisateur non-root pour la production pour plus de sécurité
USER node

EXPOSE 3000

# server.js est le point d'entrée créé par le build standalone de Next.js
CMD ["pnpm", "dev"]
