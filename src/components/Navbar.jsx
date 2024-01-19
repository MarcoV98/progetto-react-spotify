import React from "react";

const Navbar = () => {
  return (
    <div className="bg-navbar justify-content-between">
      <div className="navbar-nav col-9 col-lg-11 mainLinks d-none d-md-flex">
        <a href="#">TRENDING</a>
        <a href="#">PODCAST</a>
        <a href="#">MOODS AND GENRES</a>
        <a href="#">NEW RELEASES</a>
        <a href="#">DISCOVER</a>
      </div>
    </div>
  );
};

export default Navbar;
