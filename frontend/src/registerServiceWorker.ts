import { Workbox } from 'workbox-window';

async function registerServiceWorker() {
  const swUrl = `${process.env.PUBLIC_URL}/sw.js`;
  const workbox = new Workbox(swUrl);
  const registration = await workbox.register();

  try {
    const permission = await window.Notification.requestPermission();
    console.log(permission);
  } catch (e) {
    console.log(e);
    console.info('Push notifications will not show');
  }
}

export default registerServiceWorker;
