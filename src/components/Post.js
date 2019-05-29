import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../Styles/main.css';

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
        <div className="container-posts-main">
            {arraCop.map((postsUsers, i) => 
                {
                    return (
                        <div class="uk-card uk-card-default uk-card-body uk-width-1-2@m" key={i}>
                            <h3 class="uk-card-title">{postsUsers.title}</h3>
                            <p>Lorem ipsum <a href="#">dolor</a>{postsUsers.body}</p>
                        </div>
                    );
                })
            }
        </div>
    )
}