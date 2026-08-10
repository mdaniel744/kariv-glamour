// PM2 process definitions for the VPS. `kariv` is the existing app server;
// `kariv-escrow-release` is the 14-day auto-release job, scheduled hourly
// via PM2's cron-restart (a one-shot job, not a persistent server — it
// exits after each run, `autorestart: false` keeps it from immediately
// respawning, only the cron schedule starts it again).
//
// Each scheduled run re-executes the script fresh from disk, so a normal
// `git pull` + deploy is enough to pick up changes here — no extra deploy
// step needed for this job specifically.
module.exports = {
  apps: [
    {
      name: 'kariv',
      script: 'pnpm',
      args: 'exec next start -p 3002',
      cwd: '/var/www/kariv',
    },
    {
      name: 'kariv-escrow-release',
      script: 'node',
      args: '--env-file=.env.local scripts/releaseEscrowFunds.mjs',
      cwd: '/var/www/kariv',
      cron_restart: '7 * * * *',
      autorestart: false,
    },
  ],
};
