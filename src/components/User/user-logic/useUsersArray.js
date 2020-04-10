import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../../../actions/index';

export default function useUsersArray() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users);

    const fetchData =  async() => {
        try {
            await dispatch(fetchUsers())
        } catch (error) {
            console.error(error)
        }
    };

    useEffect(() => {
        fetchData();
        return () => fetchData();
    }, [])

    return { user }
}