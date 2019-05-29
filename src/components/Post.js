import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../Styles/main.css';
import TextTruncate from 'react-text-truncate';

export default function Post(props) {

    const [postsArray, setPostsArray] = useState([]);
    const [authorName, setAuthorName] = useState([]);

    const { match: { params } } = props;
    const idLog = params.userId;
    const parseToNumber = Number(idLog);

    const URL = 'https://jsonplaceholder.typicode.com';

    useEffect(() => {
        axios.get(`${URL}/posts/`)
            .then(response =>
                response.data
            )
            .then(data => {
                setPostsArray(data);
            });
        axios.get(`${URL}/users`)
            .then(res => res.data)
            .then(data => {
                setAuthorName(data);
            });
    }, [])
    const arraCop = postsArray.filter(postUsers => {
        return postUsers.userId === parseToNumber
    })
    const nameAuthor = authorName.filter(aurhorName => {
        return aurhorName.id === parseToNumber
        }
    )
    // console.log(postsArray);
    return (
        <div className="container-posts-main">
            <div className="header-posts">
                <div className="uk-child-width-1-3@m uk-grid-small uk-grid-match" uk-grid="false">
                    <div>
                        <div className="uk-card uk-card-body main-cards-posts-left">
                            <h3 className="uk-card-title">
                                <Link className="arrow-back" to="/">
                                    <span uk-icon="icon: reply; ratio: 2"></span> Back
                                </Link>
                            </h3>
                        </div>
                    </div>
                    <div>
                        <div className="uk-card uk-card-body main-cards-posts-center">
                             <h3 className="uk-card-title main-author-post">{nameAuthor.map((author => author.name))}</h3>
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
            {arraCop.map((postsUsers, i) => {
                return (
                    <div className="uk-card uk-card-default uk-card-body uk-width-1-2@m" key={i}>
                        <h3 className="uk-card-title">
                            <TextTruncate
                                line={1}
                                element="span"
                                truncateText="…"
                                text={postsUsers.title}
                            />
                        </h3>
                        <div className="uk-card-footer">
                                <Link to={{
                                    pathname: `/${postsUsers.userId}/post-comments`,
                                }} key={postsUsers.userId} username={postsUsers.name} 
                                 className="uk-button uk-button-primary">View Comments</Link>
                            </div>
                    </div>
                );
            })
            }
        </div>
    )
}