import React from 'react';

import Auth from '../utils/auth';
import Cards from '../components/Cards';


const Home = () => {
  const loggedIn = Auth.loggedIn();
  return (
<main>
  <div className="centered">
    {loggedIn ? (
        < Cards />
    ):( <div className="col-3 mb-3">
      <p className="centered">Welcome to DOKALY, the tinder for Music and Album Covers. <br /><br /> Press play, enjoy the music and simply swipe right for the covers you feel make sense for that music. You can also submit pictures</p>
      </div>
    )}
  </div>
</main>
  );
};

export default Home;
