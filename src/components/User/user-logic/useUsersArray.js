import { useEffect, useState } from 'react';

import { observable } from '../../../singleton/instance'

export default function useUsersArray() {
  const [userData, setUserData] = useState([]);


  const fetchData = (data) => {
    setUserData(data)
  }

  useEffect(() => {
    observable.subscribe(userList => userList !== null && fetchData(userList))
  }, []);


  return { user: userData };
}
