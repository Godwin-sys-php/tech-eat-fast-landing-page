import React, { useRef, useState, useEffect } from "react";
import logo from "../Images/icon.png";
import { Link } from "react-router-dom";

export default ({ searchValue }) => {
  const [isActive, setisActive] = useState(false)
  return (
    <>
      <nav
        class="navbar"
        role="navigation"
        aria-label="main navigation"
        style={{ backgroundColor: "#ececf2"}}
      >
        <div class="navbar-brand">
          <Link class="navbar-item" to="/" id="logo">
            
          </Link>

          <a
            role="button"
            class="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            onClick={() => {
              setisActive(!isActive);
            }}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div
          id="navbarBasicExample"
          className={`navbar-menu ${isActive ? "is-active" : ""}`}
        >
          <div class="navbar-start">
            <Link class="navbar-item" to="/">
              Téléchargez l'application
            </Link>

            <Link class="navbar-item" to="/">
              Nous contactez
            </Link>

            <Link class="navbar-item" to="/caps">
              À props de nous
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};
