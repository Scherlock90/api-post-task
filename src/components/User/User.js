import React from 'react';
import Spinner from 'react-spinner-material';
import UsersCards from './Elements/UsersCards';
import useUsersArray  from './Elements/useUsersArray';

export default function User() {
    const usersArray = useUsersArray();
    let Loaders;

    return (
        <div className="containerUser">
            <div 
                className="uk-grid-large uk-child-width-expand@s uk-text-center main-grid2" 
                uk-grid="false"
            >
                {
                        Loaders = usersArray.length 
                    ? 
                        (usersArray.map(user => (
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
                        )))
                    : 
                        (
                            Loaders = <Spinner 
                                size={120} 
                                spinnerColor={"#333"} 
                                spinnerWidth={2} 
                                visible={true} 
                            />
                        )
                }
            </div>
        </div>
    )
}