import 'server-only';
import { auth, clerkClient } from '@clerk/nextjs/server';

// Not using Clerk session claims for role (would need a Dashboard-side JWT
// template) — reading publicMetadata.role straight from the Backend API
// instead, same as middleware.js already does.
export async function getCurrentUser() {
  const { userId } = await auth();
  if (!userId) return null;
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  return {
    id: user.id,
    email: user.primaryEmailAddress?.emailAddress || '',
    fullName: user.fullName || '',
    role: user.publicMetadata?.role || 'buyer',
  };
}

export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || (user.role !== 'admin' && user.role !== 'super_admin')) {
    throw new Error('Admin access required');
  }
  return user;
}

export async function requireDealer() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'dealer') {
    throw new Error('Dealer access required');
  }
  return user;
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) throw new Error('Sign-in required');
  return user;
}

export async function setUserRole(userId, role) {
  const client = await clerkClient();
  await client.users.updateUserMetadata(userId, { publicMetadata: { role } });
}
