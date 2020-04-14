import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../../../duck/actions/index';

export default function useUsersArray() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users);

    const fetchData = () => {
        try {
            dispatch(fetchUsers())
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