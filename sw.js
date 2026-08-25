/* PitchPro Family Schedule — service worker.
   Job one: receive Web Push messages and show them (the app itself has no personal
   data in this file — payloads come encrypted from the notify function). */
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });

self.addEventListener('push', function (e) {
  var d = { title: 'PitchPro', body: 'Family schedule update', url: './schedule.html' };
  try { d = Object.assign(d, e.data.json()); } catch (err) { /* keep defaults */ }
  e.waitUntil(self.registration.showNotification(d.title, {
    body: d.body,
    icon: 'icon-192.png',
    badge: 'icon-192.png',
    data: { url: d.url }
  }));
});

self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  var url = (e.notification.data && e.notification.data.url) || './schedule.html';
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (ws) {
    for (var i = 0; i < ws.length; i++) {
      if (ws[i].url.indexOf('schedule.html') > -1 && 'focus' in ws[i]) return ws[i].focus();
    }
    return self.clients.openWindow(url);
  }));
});
