import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBookOpen } from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ onSearch }) => {
  const handleSearch = () => {
    const searchQuery = document.querySelector("#searchField").value;
    onSearch(searchQuery);
  };

  return (
    <nav className="navbar navbar-expand-md navbar-white bg-navbar fixed-left justify-content-between" id="sidebar">
      <div className="nav-container">
        <Link className="navbar-brand" to="/">
          <img
            src="logo/Spotify_Logo.png"
            alt="Spotify_Logo"
            width="131"
            height="40"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <ul>
              <li>
                <Link className="nav-item nav-link" to="/">
                  <FontAwesomeIcon icon={faHome} />
                  &nbsp; Home
                </Link>
              </li>
              <li>
                <Link className="nav-item nav-link" to="/your-library">
                  <FontAwesomeIcon icon={faBookOpen} />
                  &nbsp; Your Library
                </Link>
              </li>
              <li>
                <div className="input-group mt-3">
                  <input
                    type="text"
                    className="form-control mb-2"
                    id="searchField"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                  />
                  <div
                    className="input-group-append"
                    style={{ marginBottom: "4%" }}
                  >
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      type="button"
                      id="button-addon1"
                      onClick={handleSearch}
                    >
                      GO
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="nav-btn">
        <button className="btn signup-btn" type="button">
          Sign Up
        </button>
        <button className="btn login-btn" type="button">
          Login
        </button>
        <Link to="#">Cookie Policy</Link> |
        <Link to="#">Privacy</Link>
      </div>
    </nav>
  );
};

export default Sidebar;
