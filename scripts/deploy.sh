#!/bin/bash
set -e
export PATH=/usr/local/bin:/usr/bin:/bin:$PATH
cd /var/www/kariv
git pull origin main
pnpm install --ignore-scripts
pnpm build
pm2 restart kariv
