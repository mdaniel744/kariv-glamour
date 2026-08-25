#!/bin/bash
set -Eeuo pipefail

trap 'echo "Deploy failed at line ${LINENO}." >&2' ERR

export PATH=/usr/local/bin:/usr/bin:/bin:$PATH
cd /var/www/kariv

git pull --ff-only origin main

# Use the package-manager version committed with the app instead of relying on
# whichever global pnpm release happens to be installed on the VPS.
PNPM_SPEC="$(node -p "require('./package.json').packageManager")"
echo "Deploying $(git rev-parse --short HEAD) with ${PNPM_SPEC}."

npm exec --yes "${PNPM_SPEC}" -- install --ignore-scripts --frozen-lockfile
npm exec --yes "${PNPM_SPEC}" -- build
pm2 restart kariv --update-env
