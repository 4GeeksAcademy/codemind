import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store } = useContext(Context);
  const { user } = store;
  const location = useLocation();
  const defaultUserImg =
    "https://ui-avatars.com/api/?name=Code%20Mind&size=200&rounded=true&background=random";
  const [userImg, setUserImg] = useState(user ? user.img : defaultUserImg);
  const [navActive, setNavActive] = useState(null);

  useEffect(() => {
    setNavActive(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    setUserImg(user ? user.img : defaultUserImg);
  }, [user]);

  const defaultNavbar = (
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container">
    <Link to={"/"} className="navbar-brand logonav">
      CM_
    </Link>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to={"/roadmap"} className="nav-link itemnav">
            Road map
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/about"} className="nav-link itemnav">
            About us
          </Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
  );

  const userNavbar = (
<nav className="navbar navbar-expand-lg navbar-light bg-light align-items-center">
  <div className="container align-items-center">
    <Link to={"/"} className="navbar-brand logonav">
      CM_
    </Link>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse align-items-center" id="navbarNav">
      <ul className="navbar-nav mx-auto align-items-center"> 
        <li className="nav-item">
          <Link
            to={"/roadmap"}
            className={`nav-link ${navActive === "/roadmap" ? "active" : ""}`}
          >
            Roadmap
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to={"/about"}
            className={`nav-link ${navActive === "/about" ? "active" : ""}`}
          >
            About Us
          </Link>
        </li>
      </ul>
      <ul className="navbar-nav align-items-center">
        {user && (
          <li className="nav-item">
            <Link to={"/profile"} className="nav-link">
              <img className="profilephoto-nav" src={userImg} alt="User Profile" />
            </Link>
          </li>
        )}
        {user && (
          <li className="nav-item">
            <Link to={"/logout"} className="nav-link">
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
            </Link>
          </li>
        )}
      </ul>
    </div>
  </div>
</nav>
  );

  const navbarToRender = [
    "/registro",
    "/",
    "/login",
    "/forwotpassword",
    "/sendpassword"
  ].includes(navActive)
    ? defaultNavbar
    : userNavbar;

  return <>{navbarToRender}</>;
};
