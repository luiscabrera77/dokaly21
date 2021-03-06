import React from 'react';
import ThoughtForm from '../components/ThoughtForm';

import Auth from '../utils/auth';
// import { useQuery } from '@apollo/client';
// import { QUERY_THOUGHTS } from '../utils/queries';



const Submit = () => {
  // use useQuery hook to make query request
  // const { loading } = useQuery(QUERY_THOUGHTS);
  // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive
  const loggedIn = Auth.loggedIn();

  return (
<main>
  <div className="flex-row justify-space-between">
    {loggedIn ? (
      <div className="col-12 mb-3">
      <h3>Submit your own art for this song!</h3>
        <ThoughtForm />
      </div>
    ):( <div className="col-12 mb-3">
      <h3>Please login or sign up to contribute</h3>
      </div>
    )}
  </div>
</main>
  );
};

export default Submit;
