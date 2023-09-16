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

  const [navActive, setNavActive ] = useState(null)
  useEffect(() => {
    setNavActive(location.pathname)
    setUserImg(user ? user.img : defaultUserImg);
    
  },[location.pathname, user]);

  const defaultNavbar = (
    <nav className="navbar navbar-expand-lg bg-body-tertiary ms-4 me-4 mt-3 mb-4 p-2">
    <div className="container-fluid d-flex align-items-center">
      <div>
      <Link to="/">
        <img src="https://generation-sessions.s3.amazonaws.com/ad60b588835c42a878fbc4ab00aaadec/img/logo-5.png" alt="Logo"  className="img-logo-icon"/>
      </Link>
      </div>
      <div>
        
      </div>

      
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span className="menuBurger"><i className="fas fa-bars"></i></span>
      </button>
     
      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-end ">
       
          <li className="nav-item">
           <Link to = {"/roadmap"}><a className="nav-link" aria-current="page" href="#">Road map</a></Link>
          </li>
          <li className="nav-item">
          <Link to = {"/about"}><a className="nav-link" href="#">About us</a></Link>
          </li>

        </ul>
      </div>
    </div>
  </nav> 
  )

  const userNavbar = (
    <nav className="navbar navbar-expand-lg bg-body-tertiary ms-4 me-4 mt-3 mb-4 p-2">
      <div className="container-fluid d-flex align-items-center">
        <div>
        <Link to="/">
          <img src="https://generation-sessions.s3.amazonaws.com/ad60b588835c42a878fbc4ab00aaadec/img/logo-5.png" alt="Logo"  className="img-logo-icon"/>
        </Link>
        </div>
        <div>
          
        </div>

        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="menuBurger"><i className="fas fa-bars"></i></span>
        </button>
       
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-end ">
         
          <li className="nav-item">
          <Link to={"/profile"}><img className="profilephoto-nav me-2" src={userImg} alt="Profile" /></Link>
            </li>
            <li className="nav-item">
             <Link to = {"/roadmap"}><a className="nav-link" aria-current="page" href="#">Road map</a></Link>
            </li>
            <li className="nav-item">
            <Link to = {"/about"}><a className="nav-link" href="#">About us</a></Link>
            </li>
            <li className="nav-item logout-icon">
            <Link to={"/"}><i className="fa-solid fa-arrow-right-from-bracket logout-icon"></i></Link>
            </li>
          </ul>
        </div>
      </div>
    </nav> )

  const navbarToRender = ['/registro', '/', '/login', '/forwotpassword', '/sendpassword'].includes(navActive) ? defaultNavbar : userNavbar ;

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
