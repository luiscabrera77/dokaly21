import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';
import React from 'react';

const logout = event => {
  event.preventDefault();
  Auth.logout();
};

const Header = () => {
  return (
    <header className="mb-4 py-2 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <Link to="/">
          <img src="DOKALY-LOGO.png" alt="DOKALY LOGO" style={{width:150}}/>
        </Link>

        <nav className="text-center">
          {Auth.loggedIn() ? (
            <>
              <Link to="/submit">Submit Cover</Link>
              <Link to="/profile">Me</Link>
              <a href="/" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to="/submit">Submit Cover</Link>
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
