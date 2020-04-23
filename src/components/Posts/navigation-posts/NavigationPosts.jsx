import React from 'react';
import { Link } from 'react-router-dom';

export default function NavigationPosts({ nameAuthor, toggleModal }) {
  return (
    <div className="header-posts">
      <div
        className="uk-child-width-1-3@m uk-grid-small uk-grid-match"
        uk-grid="false"
      >
        <div id="h1">
          <div className="uk-card uk-card-body main-cards-posts-left">
            <h3 className="uk-card-title">
              <Link className="arrow-back" to="/">
                <span uk-icon="icon: reply; ratio: 2"></span>
                Back
              </Link>
            </h3>
          </div>
        </div>
        <div id="h2">
          <div className="uk-card uk-card-body main-cards-posts-center">
            <h3 className="uk-card-title main-author-post">{nameAuthor}</h3>
          </div>
        </div>
        <div id="h3">
          <div className="uk-card uk-card-body main-cards-posts-right">
            <h3 className="uk-card-title">
              <span
                className="icon-add-post"
                uk-icon="icon: plus-circle; ratio: 2"
                onClick={toggleModal}
              ></span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
