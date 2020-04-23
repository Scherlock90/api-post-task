import React from 'react';
import { Link } from 'react-router-dom';

export default function UsersCards({
  name,
  email,
  phone,
  website,
  companyName,
  companyCatchPhrase,
  companyBs,
  dispatchAuthor,
  id,
}) {
  return (
    <div className="uk-card uk-card-default uk-card-body">
      <div className="uk-card-header">
        <div className="uk-grid-small uk-flex-middle">
          <div className="uk-width-auto">
            <div className="uk-width-expand">
              <h3 className="uk-card-title uk-margin-remove-bottom main-title">
                {name}
              </h3>
            </div>
          </div>
        </div>
        <div className="uk-card-body">
          <div className="cards-main-left">
            <div>
              {' '}
              <a href="#"> {email} </a>{' '}
            </div>
            <div>
              {' '}
              <a href="#">{phone}</a>{' '}
            </div>
            <div>
              {' '}
              <a href="#">{website}</a>{' '}
            </div>
          </div>
          <div className="cards-main-left">
            <div> {companyName} </div>
            <div> {companyCatchPhrase} </div>
            <div> {companyBs} </div>
          </div>
        </div>
        <div className="uk-card-footer">
          <Link
            to={{ pathname: `/${id}/posts` }}
            onClick={dispatchAuthor}
            key={id}
            username={name}
            className="uk-button uk-button-primary"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
