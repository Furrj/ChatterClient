import React from "react";
import { Link } from "react-router-dom";

import { initState } from "../App";

//TS
import { IUser } from "../App";

interface IProps {
  loggedIn: boolean;
  setUserInfo: React.Dispatch<React.SetStateAction<IUser>>;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<IProps> = ({ loggedIn, setUserInfo, setLoggedIn }) => {
  const logout = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    setLoggedIn(false);
    setUserInfo(initState);
  };

  const toggleMode = () => {
    document.body.classList.toggle("light-mode");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        <div className="navbar-brand text-info">Chatter</div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link btn" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link btn" to="/mainfeed">
                Main Feed
              </Link>
            </li>
          </ul>
          {!loggedIn && (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link btn" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link btn" to="/register">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <span className="nav-link btn" onClick={toggleMode}>
                  <i className="fa-solid fa-circle-half-stroke"></i>
                </span>
              </li>
            </ul>
          )}
          {loggedIn && (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link btn text-info" to="/profile">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link btn" to="/login" onClick={logout}>
                  Logout
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
