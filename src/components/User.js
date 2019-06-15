import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Spinner from 'react-spinner-material';

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
                { Loaders = usersArray.length ? ( usersArray.map(user => (
                    <div className="uk-card uk-card-default uk-card-body" key={user.id}>
                        <div className="uk-card-header">
                            <div className="uk-grid-small uk-flex-middle" >
                                <div className="uk-width-auto">
                                    <div className="uk-width-expand">
                                        <h3 className="uk-card-title uk-margin-remove-bottom main-title">{user.name}</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="uk-card-body">
                                <div className="cards-main-left">
                                    <div> <a href="#"> {user.email} </a> </div>
                                    <div> <a href="#">{user.phone}</a> </div>
                                    <div> <a href="#">{user.website}</a> </div>
                                </div>
                                <div className="cards-main-left">
                                    <div>  {user.company.name} </div>
                                    <div> {user.company.catchPhrase} </div>
                                    <div> {user.company.bs} </div>
                                </div>
                            </div>
                            <div className="uk-card-footer">
                                <Link to={{
                                    pathname: `/${user.id}/posts`,
                                    usersArray: { username: user.name }
                                }} key={user.id} username={user.name} 
                                 className="uk-button uk-button-primary">Details</Link>
                            </div>
                        </div>
                    </div>
                ))): ( Loaders =  <Spinner size={120} spinnerColor={"#333"} spinnerWidth={2} visible={true} /> )
            }
            </div>
        </div>
    )
}