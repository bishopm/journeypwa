/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */ 
self.addEventListener('push', function (e) {
    if (!(self.Notification && self.Notification.permission === 'granted')) {
        //notifications aren't supported or permission not granted!
        return
    }
    if (e.data) {
        var msg = e.data.json()
        e.waitUntil(self.registration.showNotification(msg.title, {
            body: msg.body,
            icon: 'statics/icons/icon-128x128.png',
            badge: 'statics/icons/icon-128x128.png',
            actions: [{
                action: 'open-app',
                title: 'Open Journey',
                icon: 'statics/icons/icon-128x128.png'
            }]
        }));
    }
});

self.addEventListener('notificationclick', function(event) {
    let url = self.registration.scope
    event.notification.close() // Android needs explicit close.
    event.waitUntil(
        clients.matchAll({type: 'window'}).then( windowClients => {
            // Check if there is already a window/tab open with the target URL
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i]
                // If so, just focus it.
                if (client.url === url && 'focus' in client) {
                    return client.focus()
                }
            }
            // If not, then open the target URL in a new window/tab.
            if (clients.openWindow) {
                return clients.openWindow(url)
            }
        })
    )
})
