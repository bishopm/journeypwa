import axios from 'axios'
import { Platform } from 'quasar'

if (!Platform.is.ios) {
  initPush()
}

function initPush () {
  new Promise(function (resolve, reject) {
    const permissionResult = Notification.requestPermission(function (result) {
      resolve(result)
    })
    if (permissionResult) {
      permissionResult.then(resolve, reject)
    }
  })
    .then((permissionResult) => {
      if (permissionResult !== 'granted') {
        throw new Error('We weren\'t granted permission.')
      }
      subscribeUser()
    })
}

function subscribeUser () {
  navigator.serviceWorker.ready
    .then((registration) => {
      const subscribeOptions = {
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          'BLW0/oqb3EVRht3h+Szjq/NSWLVOksJT9nOLww2iILmMHAmHewjlxcSk+fSngBWHAwZuIiycqo+11jxg7PBSYXY='
        )
      }
      return registration.pushManager.subscribe(subscribeOptions)
    })
    .then((pushSubscription) => {
      storePushSubscription(pushSubscription)
    })
}

function urlBase64ToUint8Array (base64String) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4)
  var base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/')
  var rawData = window.atob(base64)
  var outputArray = new Uint8Array(rawData.length)
  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

function storePushSubscription (pushSubscription) {
  axios.post(process.env.API + '/push',
    {
      body: JSON.stringify(pushSubscription)
    })
    .then((res) => {
      // console.log('Notification received: ' + res)
    })
    .catch((err) => {
      console.log(err)
    })
}
