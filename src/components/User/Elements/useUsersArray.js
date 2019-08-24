import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useUsersArray() {
    const [usersArray, setUsersArray] = useState([]);

    const URL = 'https://jsonplaceholder.typicode.com';

    useEffect(() => {
        axios.get(`${URL}/users`)
            .then(response =>
                response.data
            )
            .then(data => {
                setUsersArray(data);
            });
    }, [])

    return usersArray
}