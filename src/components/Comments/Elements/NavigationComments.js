import React from 'react';
import { Link } from 'react-router-dom';

export default function NavigationComments({...props}) {
    return (
        <div className="header-posts">
            <div 
                className="uk-child-width-1-3@m uk-grid-small uk-grid-match" 
                uk-grid="false"
            >
                <div>
                    <div className="uk-card uk-card-body main-cards-posts-left">
                        <h3 className="uk-card-title">
                            {props.comments.map(postBack => (
                                <Link className="arrow-back" key={postBack.id} to={{
                                    pathname: `/${postBack.userId}/posts`,
                                }}>
                                    <span uk-icon="icon: reply; ratio: 2"></span> 
                                    Back
                                </Link>
                            ))}
                        </h3>
                    </div>
                </div>
                <div>
                    <div className="uk-card uk-card-body main-cards-posts-center">
                        <h3 className="uk-card-title main-author-post">
                            {props.nameAuthor}
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    )
}