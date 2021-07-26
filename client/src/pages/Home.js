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
    ):( <div className="textcontainer">
      <h3 className='infoText px-3'>Help music artists pick the right art for their songs. <br /><br />This week, we are featuring DJ KAZ's song "Blackanese". The author of the picture with the most votes will be a VIP guest at KAZ's graduation party!<br /><br />Feeling artistic? You can also contribute and propose a new cover, check it out!</h3>
      </div>
    )}
  </div>
</main>
  );
};

export default Home;
