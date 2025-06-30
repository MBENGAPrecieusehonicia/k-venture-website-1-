#!/bin/sh
# Ce script est utilisé pour exécuter les migrations prisma puis démarrer l'application.
# La commande 'set -e' garantit que le script se terminera immédiatement si une commande se termine avec un statut non nul.
set -e

# Exécuter les migrations Prisma
echo "Exécution des migrations de la base de données..."
pnpm prisma migrate deploy

# Démarrer l'application Next.js
# 'exec' remplace le processus shell par le processus node, ce qui est une bonne pratique pour les points d'entrée de conteneur.
echo "Démarrage de l'application..."
exec node server.js