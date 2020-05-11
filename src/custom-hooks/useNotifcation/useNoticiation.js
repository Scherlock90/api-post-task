import { useEffect, useState } from 'react';

export const useNotification = (notification) => {
  const [notificationClassName, setNotificationClassName] = useState('');

  const notificationHandler = (notificationTxt) => {
    if (notificationTxt.includes('Loading'))
      return setNotificationClassName('info');
    else if (notificationTxt.includes('Success'))
      return setNotificationClassName('success');
    else setNotificationClassName('normal');
  };

  useEffect(() => {
    notificationHandler(notification);

    return () => notificationHandler(notification);
  }, [notification]);

  return { notificationClassName };
};
