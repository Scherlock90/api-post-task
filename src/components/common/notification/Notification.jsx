import React from 'react';

export const Notification = ({ notification, notificationClassName }) => (
  <div className={`notification-container__${notificationClassName}`}>
    <span className='notification'>{notification}</span>
  </div>
);
