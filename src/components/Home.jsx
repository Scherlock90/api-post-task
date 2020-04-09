import React from 'react';
import User from './User/User';

export default function Home() {
  return (
    <div className="main-container">
      <div className="home-container">
        API <br/> Users-Post-Comments
      </div>
        <User />
    </div>
  )
}