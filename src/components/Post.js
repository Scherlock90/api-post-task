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
            <div className="header-posts">
                <div class="uk-child-width-1-3@m uk-grid-small uk-grid-match" uk-grid="false">
                    <div>
                        <div class="uk-card uk-card-body main-cards-posts-left">
                            <h3 class="uk-card-title">
                                <Link className="arrow-back" to="/">
                                    <span uk-icon="icon: reply; ratio: 2"></span>Back
                                </Link>
                            </h3>
                        </div>
                    </div>
                    <div>
                        <div class="uk-card uk-card-body main-cards-posts-center">
                            <h3 class="uk-card-title">Author</h3>
                        </div>
                    </div>
                    <div>
                        <div class="uk-card uk-card-body main-cards-posts-right">
                            <h3 class="uk-card-title">
                                <Link className="arrow-back" to="/#">
                                    <span uk-icon="icon:  plus-circle; ratio: 2"></span>
                                </Link>
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
            {arraCop.map((postsUsers, i) => {
                return (
                    <div class="uk-card uk-card-default uk-card-body uk-width-1-2@m" key={i}>
                        <h3 class="uk-card-title">{postsUsers.title}</h3>
                        <p>{postsUsers.body}</p>
                        <p><a href="#">View comments</a> </p>
                    </div>
                );
            })
            }
        </div>
    )
}