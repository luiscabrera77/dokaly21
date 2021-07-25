import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';
import React from 'react';
import Blackanese from '../../assets/Blackanese.mp3';

const logout = event => {
  event.preventDefault();
  Auth.logout();
};

const Header = () => {
  return (
    <header className="mb-4 py-2 align-center">
      <div className="container flex-row justify-center align-center">
        <Link to="/">
          <img src="/DOKALY-LOGO.png" alt="DOKALY LOGO" style={{width:150}}/>
        </Link>

        <nav className="centered">
          {Auth.loggedIn() ? (
            <>
              <audio id="player" allow="autoplay" loop controls>
              <source src={Blackanese} type="audio/mpeg" />
              </audio><br />
              <Link to="/submit" className="mt-3">Contribute</Link>
              <Link to="/profile">Me</Link>
              <a href="/" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to="/submit">Contribute</Link>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
