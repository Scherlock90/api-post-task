import React from 'react';

export default function CommentsCards({...props}) {
    return (
        <div className="container-post-cards">
            <div className="uk-text-center" uk-grid='false'>
                <div className="uk-width-expand@m card-center-title">
                    <div className="uk-card uk-card-default uk-card-body">
                        <h3 className="uk-card-title comments-header">
                            <div id="d1"> 
                                {props.name}
                            </div>
                            <div id="d2" className="span-email">
                                <a href="email" >
                                    {props.email}
                                </a>
                            </div>
                        </h3>
                        <div>
                            {props.body}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}