import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default function Post (props) {

    const [postsArray, setPostsArray] = useState([]);
    const { match: { params } } = props;
    useEffect(() => {

        axios.get(`https://jsonplaceholder.typicode.com/posts/${params.userId}`)
            .then(response =>
                response.data.userId
            )
            .then(data => {
                setPostsArray(data);
            });
    }, [])
    const idLog = params.userId;
    console.log(idLog);
    console.log(postsArray);
    return (
        <div>
            {postsArray}
        </div>
    )
}