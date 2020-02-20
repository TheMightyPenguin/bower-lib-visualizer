import { register } from 'register-service-worker';

function registerServiceWorker() {
  const swUrl = `${process.env.PUBLIC_URL}/sw.js`;
  register(swUrl);
}

export default registerServiceWorker;
