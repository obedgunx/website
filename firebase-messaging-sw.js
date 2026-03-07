// firebase-messaging-sw.js
// Taruh file ini di folder yang SAMA dengan cloudstore.html

importScripts('https://www.gstatic.com/firebasejs/12.10.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.10.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBHs-znBpXKBXI1FwtAD5S-sVxOhFrllKo",
  authDomain: "toko-online-5de51.firebaseapp.com",
  projectId: "toko-online-5de51",
  storageBucket: "toko-online-5de51.firebasestorage.app",
  messagingSenderId: "219612936849",
  appId: "1:219612936949:web:3ab10ea9e2ca69901323bc"
});

const messaging = firebase.messaging();

// Handle background push notifications (saat tab tidak aktif / browser minimize)
messaging.onBackgroundMessage(payload => {
  const { title, body, icon } = payload.notification || {};
  self.registration.showNotification(title || 'CloudNest', {
    body: body || '',
    icon: icon || '/icon-192.png',
    badge: '/icon-72.png',
    tag: 'cloudnest-notif',
    data: payload.data
  });
});

// Klik notifikasi → buka/fokus tab CloudNest
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      for (const client of windowClients) {
        if (client.url.includes('cloudstore') && 'focus' in client) {
          return client.focus();
        }
      }
      return clients.openWindow('/cloudstore.html');
    })
  );
});
