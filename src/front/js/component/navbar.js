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


  }, [location.pathname]);


  useEffect(() => {
    setUserImg(user ? user.img : defaultUserImg);
  }, [user]);

  const defaultNavbar = (
<div class="container text-center">
  <div class="row d-flex justify-content-evenly align-items-center">
    <div class="col">
      <Link to={"/"} className="logonav">CM_</Link>
    </div>
    <div class="col">
    <Link to={"/roadmap"} className="itemnav mx-2">Road map</Link>
    <Link to={"/about"} className="itemnav mx-2">About us</Link>
    </div>
    <div class="col">
      
    </div>
  </div>
</div>
  )

  const userNavbar = (
<div class="container text-center">
  <div class="row d-flex justify-content-evenly align-items-center">
    <div class="col">
    <Link to={"/"} className="logonav">CM_</Link>
    </div>
    <div class="col">
    <Link to={"/roadmap"} className="itemnav mx-2">Road map</Link>
    <Link to={"/about"} className="itemnav mx-2">About us</Link>
    </div>
    <div class="col">
      <Link to={"/profile"} ><img className="profilephoto-nav" src={userImg}></img></Link>
    </div>
  </div>
</div>

  )

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
