import React from 'react';
import ThoughtList from '../components/ThoughtList';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS } from '../utils/queries';



const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive
  const thoughts = data?.thoughts || [];
  //console.log(thoughts);
  const loggedIn = Auth.loggedIn();

  return (
<main>
  <div className="flex-row justify-space-between">
    {loggedIn && (
      <div className="col-12 mb-3">
        <p>Swipe right if you like!</p>
      </div>
    )}
    <div className={`col-12 mb-3 ${loggedIn && 'col-12 mb-3'}`}>
    {loading ? (
      <div>Loading...</div>
    ) : (
      <ThoughtList thoughts={thoughts}/>
    )}
    </div>
  </div>
</main>
  );
};

export default Home;
