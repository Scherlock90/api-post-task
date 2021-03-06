import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../../ducks/actions/index';
import { errorInformation } from '../../../utils/utils';

export default function useUsersArray () {
  const dispatch = useDispatch();

  const user = useSelector(({ users }) => users);

  const fetchData = () => dispatch(fetchUsers());

  useEffect(() => {
    try {
      fetchData();
    } catch (err) {
      errorInformation(err);
    }

    return () => fetchData();
  }, []);

  return { user };
}
