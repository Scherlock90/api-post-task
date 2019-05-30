import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../Styles/main.css';

export default function PostComments(props) {
    const [commentsArray, setCommentsArray] = useState([]);
    const [authorCommentsName, setAuthorCommentsName] = useState([]);
    const [usersName, setUsersName] = useState([]);
    const [postsOne, setPostsOne] = useState([]);

    const { match: { params } } = props;
    const idLog = params.postId;
    const parseToNumber = Number(idLog);

    const URL = 'https://jsonplaceholder.typicode.com';

    useEffect(() => {
        axios.get(`${URL}/comments/`)
            .then(response =>
                response.data
            )
            .then(data => {
                setCommentsArray(data);
            });
        axios.get(`${URL}/posts/`)
            .then(res => res.data)
            .then(data => {
                setPostsOne(data);
            });
        axios.get(`${URL}/users/`)
            .then(res => res.data)
            .then(data => {
                setUsersName(data);
            });
    }, [])
    const arraCop = commentsArray.filter(postUsers => {
        return postUsers.postId === parseToNumber
    })
    const posts2 = postsOne.filter(aurhorName => {
        return aurhorName.id === parseToNumber
    })
    const nameAuthor = usersName.filter(aurhorName => {
        return aurhorName.id === Number(posts2.map(ee => ee.userId))
    })
    console.log(posts2.map(ee => ee.userId));
    console.log(arraCop.map(ee => ee));
    return (
        <div className="container-posts-main">
            <div className="header-posts">
                <div className="uk-child-width-1-3@m uk-grid-small uk-grid-match" uk-grid="false">
                    <div>
                        <div className="uk-card uk-card-body main-cards-posts-left">
                            <h3 className="uk-card-title">
                                {posts2.filter(ee => ee.userId).map(postBack => (
                                    <Link className="arrow-back" to={{
                                        pathname: `/${postBack.userId}/posts`,
                                    }}>
                                        <span uk-icon="icon: reply; ratio: 2"></span> Back
                                    </Link>
                                ))}
                            </h3>
                        </div>
                    </div>
                    <div>
                        <div className="uk-card uk-card-body main-cards-posts-center">
                            <h3 className="uk-card-title main-author-post"> 
                                {nameAuthor.map((postsUsers => postsUsers.name))}
                            </h3>
                        </div>
                    </div>
                    <div>
                        <div className="uk-card uk-card-body main-cards-posts-right">
                            <h3 className="uk-card-title">
                                <Link className="arrow-back" to="/#">
                                    <span uk-icon="icon:  plus-circle; ratio: 2"></span>
                                </Link>
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {posts2.map((postsUsers, i) => {
                    return (
                        <div className="container-post-cards one-post-container" key={i} >
                            <div className="uk-text-center" uk-grid='false'>
                                <div className="uk-width-expand@m card-center-title">
                                    <div className="uk-card uk-card-default uk-card-body">
                                        <div className="title-one-post">
                                            {postsUsers.title}
                                        </div>
                                        <div className="body-one-post">
                                            {postsUsers.body}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
                }
            </div>
            <div>
                {arraCop.map((commentsPost, i) => {
                    return (
                        <div className="container-post-cards" key={i} >
                            <div className="uk-text-center" uk-grid='false'>
                                <div className="uk-width-expand@m card-center-title">
                                    <div className="uk-card uk-card-default uk-card-body">
                                        <h3 className="uk-card-title">{commentsPost.name}</h3>
                                        <div>
                                            {commentsPost.body}
                                        </div>
                                        <div>
                                            {commentsPost.email}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
                }
            </div>
        </div>
    )
}

