import React from 'react';
import Spinner from 'react-spinner-material';
import UsersCards from './user-cards/UsersCards';
import useUsersArray from './user-logic/useUsersArray';

export default function User() {
  const { user } = useUsersArray();

  return (
    <div className='container-user'>
      <div className='uk-grid-large uk-child-width-expand@s uk-text-center main-grid2' uk-grid='false'>
        {user.users.length ? (
          user.users.map(({ id, name, email, phone, website, company }) => (
            <UsersCards
              key={id}
              id={id}
              name={name}
              email={email}
              phone={phone}
              website={website}
              companyName={company.name}
              companyBs={company.bs}
              companyCatchPhrase={company.catchPhrase}
            />
          ))
        ) : (
          <Spinner size={120} spinnerColor='#333' spinnerWidth={2} visible={true} />
        )}
      </div>
    </div>
  );
}
