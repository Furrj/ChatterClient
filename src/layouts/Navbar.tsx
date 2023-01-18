import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { reqRoutes } from "../utils/reqRoutes";

interface IProps {
  loggedIn: boolean;
  toggleColorMode: () => void;
  userValidation: () => Promise<void>;
}

const Navbar: React.FC<IProps> = ({
  loggedIn,
  toggleColorMode,
  userValidation
}) => {
  const logout = async (
    e: React.MouseEvent<HTMLAnchorElement>
  ): Promise<void> => {
    const req = await fetch(`${reqRoutes()}/logout`, {
      credentials: "include",
    });
    const res = await req.json();
    userValidation();
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
