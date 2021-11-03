import React from "react";
import "./NavBar.css";
import logo from "../../1298742_foursquare_icon 1.svg";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className={"nav"}>
      <Link to={"/"}>
        <img src={logo} alt={"logo"} />
      </Link>
      <div className={"nav__actions"}>
        <Link to={"/"}>
          <p>All Posts</p>
        </Link>
        <Link to={"/new"}>
          <p>New Post</p>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
