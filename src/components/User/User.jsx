import React from 'react';
import Spinner from 'react-spinner-material';
import UsersCards from './user-cards/UsersCards';
import useUsersArray  from './user-logic/useUsersArray';

export default function User() {
    const { user } = useUsersArray();

    return (
        <div className="container-user">
            <div className="uk-grid-large uk-child-width-expand@s uk-text-center main-grid2" uk-grid="false">
                {
                    user.users.length > 1
                    ?
                        (user.users.map(user => (
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
                        <Spinner
                            size={120}
                            spinnerColor={"#333"}
                            spinnerWidth={2}
                            visible={true}
                        />
                }
            </div>
        </div>
    )
}