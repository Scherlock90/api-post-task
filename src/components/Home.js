import React from 'react';
import User from './User';

const styleUsers = {
  fontSize: '220%',
  textAlign: 'center',
  margin: '1em'
}

export default function Home() {
  return (
    <div className="mainContainer">
      <div style={styleUsers}>API <br/> Users-Post-Comments</div>
        <User />
    </div>
  )
}