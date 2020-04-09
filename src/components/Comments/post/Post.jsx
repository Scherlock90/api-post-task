import React from 'react';

export default function Post({ title, body }) {
    return (
        <div className="container-to-comments">
            <div className="container-post-cards one-post-container" >
                <div className="uk-text-center" uk-grid='false'>
                    <div className="uk-width-expand@m card-center-title">
                        <div className="uk-card uk-card-default uk-card-body">
                            <div className="title-one-post">
                                { title }
                            </div>
                            <div className="body-one-post">
                                { body }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}