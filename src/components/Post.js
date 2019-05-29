import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Post(props) {

    const [postsArray, setPostsArray] = useState([]);
    const { match: { params } } = props;
    const idLog = params.userId;
    const parseToNumber = Number(idLog);
    useEffect(() => {
        // axios.get(`https://jsonplaceholder.typicode.com/posts/${params.userId}`)
        axios.get(`https://jsonplaceholder.typicode.com/posts/`)
            .then(response =>
                response.data
            )
            .then(data => {
                setPostsArray(data);
            });
    }, [])
    const arraCop = postsArray.filter(postUsers => {
        return postUsers.userId === parseToNumber
    })
    // console.log(postsArray);
    // console.log(idLog);
    // console.log(postsArray.map(ee => ee.userId === parseToNumber));
    // // console.log(arraCop.map(ee => ee.body));
    return (
        <div>
            <div>
                {arraCop.map((postsUsers, i) => 
                    {
                        return (
                            <ul key={i}>
                                <div>
                                    {postsUsers.title}
                                </div>
                                <div>
                                    {postsUsers.body}
                                </div>
                            </ul>
                        );
                    })
                }
            </div>
        </div>
    )
}