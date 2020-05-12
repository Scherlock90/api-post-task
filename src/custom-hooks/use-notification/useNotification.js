import { useEffect, useState } from 'react';

export const useNotification = notification => {
  const [notificationClassName, setNotificationClassName] = useState('');

  const notificationHandler = notificationTxt => {
    if (notificationTxt.includes('Loading') || notificationTxt.includes('Removing'))
      return setNotificationClassName('info');
    else if (notificationTxt.includes('Success'))
      return setNotificationClassName('success');
    else if (notificationTxt.includes('Error')) return setNotificationClassName('error');
    else setNotificationClassName('normal');
  };

  useEffect(() => {
    notificationHandler(notification);

    return () => notificationHandler(notification);
  }, [notification]);

  return { notificationClassName };
};
