// Minimal push-notification service worker. Payload shape (JSON) matches
// the `notifications` table columns directly: { title, body, link_path }.

self.addEventListener('push', (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch {
    data = { title: 'Kariv Glamour', body: event.data ? event.data.text() : '' };
  }

  const title = data.title || 'Kariv Glamour';
  const options = {
    body: data.body || '',
    icon: '/logos/kariv-glamour-mobile-green.webp',
    data: { linkPath: data.link_path || '/' },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const linkPath = event.notification.data?.linkPath || '/';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(async (clientList) => {
      const existing = clientList[0];
      if (existing) {
        if ('navigate' in existing) await existing.navigate(linkPath);
        return existing.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow(linkPath);
    })
  );
});
