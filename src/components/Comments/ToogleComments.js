import React from 'react';

export default function ToogleComments({...props}) {
    return (
        <div className="container-for-buttons-commments">
            <div>
                <div className="uk-card uk-card-body main-cards-posts-left">
                    <h3 className="uk-card-title cont-button">
                        <span 
                            className="icon-add-comments" 
                            uk-icon={props.isActive ? 'icon:  arrow-up; ratio: 2' : 'icon:  arrow-down; ratio: 2'} 
                            onClick={props.activeComments}
                        ></span>
                        <div className="title-button-add-comment"> 
                            {props.isActive ? 'Hide comments' : 'Show Commments'} 
                        </div>
                    </h3>
                </div>
            </div>
            <div>
                <div className="uk-card uk-card-body main-cards-posts-right">
                    <h3 className="uk-card-title cont-button">
                        <span 
                            className="icon-add-comments" 
                            uk-icon="icon:  plus-circle; ratio: 2" 
                            onClick={props.toggleModal}
                        ></span>
                        <div className="title-button-add-comment">
                            Add Comment
                        </div>
                    </h3>
                </div>
            </div>
        </div>
    )
}