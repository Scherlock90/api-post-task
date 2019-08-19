import React from 'react';
import { Link } from 'react-router-dom';

export default function UsersCards(props) {
    return (
        <div className="uk-card uk-card-default uk-card-body">
            <div className="uk-card-header">
                <div className="uk-grid-small uk-flex-middle" >
                    <div className="uk-width-auto">
                        <div className="uk-width-expand">
                            <h3 className="uk-card-title uk-margin-remove-bottom main-title">
                                {props.name}
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="uk-card-body">
                    <div className="cards-main-left">
                        <div> <a href="#"> {props.email} </a> </div>
                        <div> <a href="#">{props.phone}</a> </div>
                        <div> <a href="#">{props.website}</a> </div>
                    </div>
                    <div className="cards-main-left">
                        <div> {props.companyName} </div>
                        <div> {props.companyCatchPhrase} </div>
                        <div> {props.companyBs} </div>
                    </div>
                </div>
                <div className="uk-card-footer">
                    <Link to={{
                        pathname: `/${props.id}/posts`,
                        usersArray: { username: props.name }
                    }} key={props.id} username={props.name}
                        className="uk-button uk-button-primary">
                        Details
                    </Link>
                </div>
            </div>
        </div>
    )
}