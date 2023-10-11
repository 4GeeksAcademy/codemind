import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation , useNavigate} from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store , actions } = useContext(Context);
  const { user } = store;
  const location = useLocation()
  const navigate = useNavigate();
  const defaultUserImg = "https://images.squarespace-cdn.com/content/v1/5e6cfa89c315535aba12ee9d/1620070500897-0BUOX95Q8M9ZB3WQQPPR/Logo+-+Einstein+%282%29.png";
  const [userImg, setUserImg] = useState(user ? user.img : defaultUserImg);
 
  const [navActive, setNavActive] = useState(null)
  useEffect(() => {
    setNavActive(location.pathname)
    if(user){
      setUserImg(user.img || defaultUserImg)
    }else{
      setUserImg(defaultUserImg);
      
    }
    
  },[location.pathname, user, store.user]);


const handleLogout = async (e) => {
    e.preventDefault();
    console.log("Handle logout called");
    
    try {
        const response = await actions.logout();

        if (response.success){
            navigate("/")

        }else{
            setErrorLogin("logout fallido.");
        }

    } catch (error) {
        console.log(error)
    }

};




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
        <div id="nav-title" target="_blank">
          <Link to={"/modules"}><a className="text-primary font-weight-bold" aria-current="page" href="#">CodeMind</a></Link>
        </div>
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
            <Link to={"/profile"}><img src={userImg} alt="Avatar" className="rounded-circle"/></Link>
          </div>
          <div id="nav-footer-titlebox d-flex justify-content-center ms-2">
            <a id="nav-footer-title d-flex justify-content-end ms-2" href="#" target="_blank">
            <Link to={"/profile"}>{user && user.firstName ? user.firstName : null} {user && user.lastName ? user.lastName : null}</Link>
            </a>
            <div>
            <span id="nav-footer-subtitle">{user && user.role ? user.role : null}</span>
            </div>
          </div>
          <label htmlFor="nav-footer-toggle">
            <i className="fas fa-caret-up"></i>
          </label>
        </div>
        <div id="nav-footer-content">
  <div className="nav-item">
    <Link to={"/"} className="btn btn-outline-primary" onClick={handleLogout} >Log out</Link>
  </div>
</div>
      </div>
    </div>)


  const teacherNavbar = (
    <div id="nav-bar">
    <input id="nav-toggle" type="checkbox" />
    <div id="nav-header">
      <div id="nav-title" target="_blank">
        <Link to={"/modules"}><a className="text-primary font-weight-bold" aria-current="page" href="#">CodeMind</a></Link>
      </div>
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
      <div className="nav-button">
        <Link to={"/student"}><i class="fa-solid fa-user-group p-3"></i><span>Students</span></Link>
      </div> 
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
      <div className="nav-button">
        <i className="fas fa-magic"></i><span>Spark</span>
      </div> 
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
          <Link to={"/profile"}><img src={userImg} alt="Avatar" className="rounded-circle" /></Link>
        </div>
        <div id="nav-footer-titlebox d-flex justify-content-center ms-2">
          <a id="nav-footer-title d-flex justify-content-end ms-2" href="#" target="_blank">
          <Link to={"/profile"}>{user && user.firstName ? user.firstName : null} {user && user.lastName ? user.lastName : null}</Link>
          </a>
          <div>
          <span id="nav-footer-subtitle">{user && user.role ? user.role : null}</span>
          </div>
        </div>
        <label htmlFor="nav-footer-toggle">
          <i className="fas fa-caret-up"></i>
        </label>
      </div>
   <div id="nav-footer-content">
  <div className="nav-item">
    <Link to={"/"} className="btn btn-outline-primary" onClick={handleLogout} >Log out</Link>
  </div>

      </div>
    </div>
  </div>
  )


  const renderNavbarBasedOnRole = () => {
    if (['/registro', '/', '/login', '/forwotpassword', '/sendpassword'].includes(navActive)) {
      return defaultNavbar;
    } else if (user && user.role === 'alumno') {
      return userNavbar;
    } else if (user && user.role === 'teacher') {
      return teacherNavbar;
    }
  };

  return (
    <>
{renderNavbarBasedOnRole()}
    
{console.log(navActive)}
    </>
  );
};
