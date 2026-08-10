import 'server-only';
import { clerkClient } from '@clerk/nextjs/server';

// Batched Clerk lookup so order/message shaping never fires one request per
// row. Cache is per server-action invocation (module-level, short-lived
// process) — good enough since a single request never needs more than a
// couple dozen identities.
export async function loadIdentities(userIds) {
  const ids = [...new Set(userIds.filter(Boolean))];
  const map = new Map();
  if (ids.length === 0) return map;

  const client = await clerkClient();
  const { data } = await client.users.getUserList({ userId: ids, limit: ids.length });
  for (const u of data) {
    map.set(u.id, {
      fullName: u.fullName || u.username || '',
      email: u.primaryEmailAddress?.emailAddress || '',
      phone: u.primaryPhoneNumber?.phoneNumber || '',
    });
  }
  return map;
}
