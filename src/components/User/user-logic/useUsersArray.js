import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../../ducks/actions/index';
import { errorInformation } from '../../../utils/utils';


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
