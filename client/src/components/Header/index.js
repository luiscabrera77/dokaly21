import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';
import React from 'react';

const logout = event => {
  event.preventDefault();
  Auth.logout();
};

const Header = () => {
  return (
    <header className="mb-4 py-2 align-center">
      <div className="container flex-row justify-center align-center">
        <Link to="/">
          <img src="/DOKALY-LOGO.png" alt="DOKALY HOME" style={{width:150}}/>
        </Link>

        <nav className="centered">
          {Auth.loggedIn() ? (
            <>
              <Link to="/">Home</Link>
              <Link to="/submit" className="mt-3">Contribute</Link>
              <Link to="/profile">Me</Link>
              <a href="/" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to="/">Home</Link>
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
