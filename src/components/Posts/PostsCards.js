import React from 'react';
import TextTruncate from 'react-text-truncate';
import { Link } from 'react-router-dom';

export default function PostsCards ({...props}) {
	return (
		<div className="container-post-cards">
			<div className="uk-text-center" uk-grid='false'>
				<div id="c1" className="uk-width-auto@m">
					<div className="uk-card uk-card-default uk-card-body">
                        <span 
                            className="icon-go-to-trash" 
                            uk-icon="icon: trash; ratio: 2" 
                            onClick={props.handleDeletedPost} 
                        ></span>
					</div>
				</div>
				<div id="c2" className="uk-width-expand@m card-center-title">
					<div className="uk-card uk-card-default uk-card-body">
						<TextTruncate
							truncateText="…"
							line={1}
							text={props.title}
						/>
					</div>
				</div>
				<div id="c3" className="uk-width-1-3@m">
					<div className="uk-card uk-card-default uk-card-body button-go-to-post">
						<Link 
							to={{ pathname: `/${props.pathnameId}/post-comments` }} 
                            username={props.name}
							className="uk-button"
                        > 
							<span uk-icon="icon: chevron-right; ratio: 2"></span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}