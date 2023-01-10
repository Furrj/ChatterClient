import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { initState } from "../App";
import { reqRoutes } from "../utils/reqRoutes";

//TS
import { IUser } from "../App";

interface IProps {
  loggedIn: boolean;
  setUserInfo: React.Dispatch<React.SetStateAction<IUser>>;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  darkMode: boolean;
  toggleColorMode: () => void;
}

const Navbar: React.FC<IProps> = ({
  loggedIn,
  setUserInfo,
  setLoggedIn,
  darkMode,
  toggleColorMode,
}) => {
  const logout = async (e: React.MouseEvent<HTMLAnchorElement>): Promise<void> => {
    setLoggedIn(false);
    setUserInfo(initState);

    const req = await fetch(`${reqRoutes()}/logout`, {
      credentials: "include",
    });
    const res = await req.json();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className={`container-fluid`}>
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
                <span className="nav-link btn" onClick={toggleColorMode}>
                  <i className="fa-solid fa-circle-half-stroke"></i>
                </span>
              </li>
            </ul>
          )}
          {loggedIn && (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  className={`nav-link btn ${styles.profile}`}
                  to="/profile"
                >
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link btn" to="/login" onClick={logout}>
                  Logout
                </Link>
              </li>
              <li className="nav-item">
                <span className="nav-link btn" onClick={toggleColorMode}>
                  <i className="fa-solid fa-circle-half-stroke"></i>
                </span>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
