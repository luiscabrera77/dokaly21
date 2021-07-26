import React from 'react';
import { useParams } from 'react-router-dom';

import Auth from '../utils/auth';
import Cards from '../components/Cards';

import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';

const Home = () => {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam }
  });

  const user = data?.me || data?.user || {};

  const loggedIn = Auth.loggedIn();
  return (
<main>
  <div className="centered">
    {loggedIn ? (
      < Cards />
    ):( <div className="textcontainer">
      <h3 className='infoText px-3'>
      Today's Featured Artist and song:
      </h3>
      <img src="/cover.png" alt="DJKAZ" style={{width:350}}/>
      </div>
    )}
  </div>
</main>
  );
};

export default Home;
