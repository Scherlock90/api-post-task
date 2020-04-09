import React from 'react';
import { Link } from 'react-router-dom';

export default function NavigationComments({ post, nameAuthor }) {
    return (
        <div className="header-posts">
            <div className="uk-child-width-1-3@m uk-grid-small uk-grid-match" uk-grid="false">
                <div className="uk-card uk-card-body main-cards-posts-left">
                    <h3 className="uk-card-title">
                        {post.map(({ id }) => (
                            <Link className="arrow-back" key={id} to={{ pathname: `/${id}/posts`}}>
                                <span uk-icon="icon: reply; ratio: 2"></span>
                                Back
                            </Link>
                        ))}
                    </h3>
                </div>
                <div>
                    <div className="uk-card uk-card-body main-cards-posts-center">
                        <h3 className="uk-card-title main-author-post">
                            { nameAuthor }
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    )
}