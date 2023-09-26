import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store } = useContext(Context);
  const { user } = store;
  const location = useLocation()
  const defaultUserImg = "https://ui-avatars.com/api/?name=Code%20Mind&size=200&rounded=true&background=random";
  const [userImg, setUserImg] = useState(user ? user.img : defaultUserImg);
  console.log(user)
  const [navActive, setNavActive] = useState(null)
  useEffect(() => {
    setNavActive(location.pathname)
    if(user){
      setUserImg(user.img || defaultUserImg)
    }else{
      setUserImg(defaultUserImg);
    }
    
  },[location.pathname, user, store.user]);

  const defaultNavbar = (
    <nav className="navbar navbar-expand-lg bg-body-tertiary ms-4 me-4 mt-3 mb-4 p-2">
      <div className="container-fluid d-flex align-items-center">


        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="menuBurger"><i className="fas fa-bars"></i></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-end ">

            <li className="nav-item">
              <Link to={"/roadmap"}><a className="nav-link" aria-current="page" href="#">Road map</a></Link>
            </li>
            <li className="nav-item">
              <Link to={"/about"}><a className="nav-link" href="#">About us</a></Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  )

  const userNavbar = (
    <div id="nav-bar">
      <input id="nav-toggle" type="checkbox" />
      <div id="nav-header">
        <a id="nav-title" target="_blank">
          <Link to={"/modules"}><a className="text-primary font-weight-bold" aria-current="page" href="#">CodeMind</a></Link>
        </a>
        <label htmlFor="nav-toggle">
          <span id="nav-toggle-burger"></span>
        </label>
        <hr />
      </div>
      <div id="nav-content">
        <div className="nav-button">
          <i className="fas fa-palette"></i><span>Modules</span>
        </div>
        <div className="nav-button">
          <i className="fas fa-images"></i><span>Library</span>
        </div>
        {/* <div className="nav-button">
          <i className="fas fa-thumbtack"></i><span></span>
        </div> */}
        <hr />
        <div className="nav-button">
          <i className="fas fa-chart-line"></i><span>Progress</span>
        </div>
        <div className="nav-button">
          <i className="fas fa-fire"></i><span>Road Map</span>
        </div>
        <div className="nav-button">
          <i className="fas fa-heart"></i><span>About Us</span>
        </div>
        {/* <div className="nav-button">
          <i className="fas fa-magic"></i><span>Spark</span>
        </div> */}
        <hr />
        {/* <div className="nav-button">
          <i className="fas fa-gem"></i><span>Codepen Pro</span>
        </div> */}
        <div id="nav-content-highlight"></div>
      </div>
      <input id="nav-footer-toggle" type="checkbox" />
      <div id="nav-footer">
        <div id="nav-footer-heading">
          <div id="nav-footer-avatar">
            <img src={userImg} alt="Avatar" />
          </div>
          <div id="nav-footer-titlebox d-flex justify-content-center ms-2">
            <a id="nav-footer-title d-flex justify-content-end ms-2" href="#" target="_blank">
              {user.firstName +  " " + user.lastName}
            </a>
            <div>
            <span id="nav-footer-subtitle">{user.role}</span>
            </div>
          </div>
          <label htmlFor="nav-footer-toggle">
            <i className="fas fa-caret-up"></i>
          </label>
        </div>
        <div id="nav-footer-content">
          <div className="nav-item">
            <Link to={"/"} className="btn btn-outline-primary">Log out</Link>
          </div>
        </div>
      </div>
    </div>)

  const navbarToRender = ['/registro', '/', '/login', '/forwotpassword', '/sendpassword'].includes(navActive) ? defaultNavbar : userNavbar;

  return (
    <>

      {
        navbarToRender
      }
      {
        console.log(navActive)
      }
    </>
  );
};
