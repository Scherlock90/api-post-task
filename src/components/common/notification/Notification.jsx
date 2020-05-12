import React from 'react';

export const Notification = ({ notification, notificationClassName }) => (
  <div className={`notification-container__${notificationClassName}`}>
    <p className='notification'>{notification}</p>
  </div>
);
