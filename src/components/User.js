import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from 'react-spinner-material';

function UsersCards(props) {
    return (
        <div className="uk-card uk-card-default uk-card-body">
            <div className="uk-card-header">
                <div className="uk-grid-small uk-flex-middle" >
                    <div className="uk-width-auto">
                        <div className="uk-width-expand">
                            <h3 className="uk-card-title uk-margin-remove-bottom main-title">{props.name}</h3>
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

export default function User() {
    const [usersArray, setUsersArray] = useState([]);

    const URL = 'https://jsonplaceholder.typicode.com';

    useEffect(() => {
        axios.get(`${URL}/users`)
            .then(response =>
                response.data
            )
            .then(data => {
                setUsersArray(data);
            });
    }, [])

    let Loaders;
    return (
        <div className="containerUser">
            <div className="uk-grid-large uk-child-width-expand@s uk-text-center main-grid2" uk-grid="false">
                {Loaders = usersArray.length ? (usersArray.map(user => (
                    <UsersCards
                        key={user.id}
                        id={user.id}
                        name={user.name}
                        email={user.email}
                        phone={user.phone}
                        website={user.website}
                        companyName={user.company.name}
                        companyBs={user.company.bs}
                        companyCatchPhrase={user.company.catchPhrase} 
                    />
                ))) : (Loaders = <Spinner size={120} spinnerColor={"#333"} spinnerWidth={2} visible={true} />)
                }
            </div>
        </div>
    )
}