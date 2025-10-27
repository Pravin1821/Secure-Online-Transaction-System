import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Navbar = ({ theme, toggleTheme }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="navbar bg-base-100 shadow-lg"
    >
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl font-bold text-gradient">
          Secure Transaction
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        {isAuthenticated && (
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link
                to="/dashboard"
                className={`btn btn-ghost ${isActive('/dashboard') ? 'btn-active' : ''}`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/transactions"
                className={`btn btn-ghost ${isActive('/transactions') ? 'btn-active' : ''}`}
              >
                Transactions
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className={`btn btn-ghost ${isActive('/profile') ? 'btn-active' : ''}`}
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                to="/security"
                className={`btn btn-ghost ${isActive('/security') ? 'btn-active' : ''}`}
              >
                Security
              </Link>
            </li>
          </ul>
        )}
      </div>

      <div className="navbar-end">
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>

        {isAuthenticated ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <div className="bg-primary text-primary-content rounded-full w-10 h-10 flex items-center justify-center font-bold">
                  {user?.username?.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <div className="justify-between">
                  <span>Welcome, {user?.username}</span>
                </div>
              </li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/security">Security</Link></li>
              <li><button onClick={logout}>Logout</button></li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-ghost">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary">
              Register
            </Link>
          </div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;


