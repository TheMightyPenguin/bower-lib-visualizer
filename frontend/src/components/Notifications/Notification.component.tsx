import React, { useState, useEffect } from 'react';
import Box from 'components/Box';

let sendNotification: (element: JSX.Element) => void;

const UpdateServiceWorkerNotice: React.FC = () => {
  const [notification, setNotification] = useState<JSX.Element>();

  useEffect(() => {
    sendNotification = setNotification;
  }, [setNotification]);

  console.log('notification!!', notification);

  return notification ? (
    <Box
      position="fixed"
      top="60px"
      left="0"
      right="0"
      height="60px"
      backgroundColor="primary"
    >
      {notification}
    </Box>
  ) : null;
};

export default UpdateServiceWorkerNotice;
export { sendNotification };
