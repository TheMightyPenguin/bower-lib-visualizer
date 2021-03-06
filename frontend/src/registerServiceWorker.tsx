import React from 'react';
import Flex from 'components/Flex';
import { Workbox } from 'workbox-window';
import { sendNotification } from 'components/Notifications';

async function registerServiceWorker() {
  const swUrl = `${process.env.PUBLIC_URL}/sw.js`;
  const workbox = new Workbox(swUrl);

  workbox.addEventListener('waiting', () => {
    sendNotification(
      <Flex
        onClick={() => {
          workbox.messageSW({ type: 'SKIP_WAITING' });
        }}
        color="white"
        paddingX="small"
        justifyContent="center"
        alignItems="center"
        fontSize="large"
        fontWeight="bold"
        height="100%"
        boxShadow="5px 5px 16px 5px #9FB1BCCE"
        cursor="pointer"
        textDecoration="underline"
      >
        There&apos;s an update! Click here to update the App!
      </Flex>
    );

    workbox.addEventListener('controlling', () => {
      window.location.reload();
    });
  });

  await workbox.register();
  await window.Notification.requestPermission();
}

export default registerServiceWorker;
