import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const { user } = store;
  const location = useLocation()
  const navigate = useNavigate();
  const defaultUserImg = "https://images.squarespace-cdn.com/content/v1/5e6cfa89c315535aba12ee9d/1620070500897-0BUOX95Q8M9ZB3WQQPPR/Logo+-+Einstein+%282%29.png";
  const [userImg, setUserImg] = useState(user ? user.img : defaultUserImg);

  const [navActive, setNavActive] = useState(null)

  const shouldHide = !navActive; // Ocultar cuando la barra no esté desplegada

  useEffect(() => {
    setNavActive(location.pathname)
    if (user) {
      setUserImg(user.img || defaultUserImg)
    } else {
      setUserImg(defaultUserImg);

    }

  }, [location.pathname, user, store.user]);

  const [checked, setChecked] = useState(true)
  const [checkedTwo, setCheckedTwo] = useState(false)
  const toggleLogOut = (active) => {
    setChecked(active)
    if (active === true) {
      setCheckedTwo(false)
    }
  }

  useEffect(() => {
    // console.log(location)
  if(location.pathname == '/changepassword'){
      
      return
    }

  if(!store.token) {
      navigate("/")

    }
  }, [store.token])


  const handleLogout = async (e) => {
    e.preventDefault();
    console.log("Handle logout called");
    actions.logout();



  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const defaultNavbar = (
    <nav id='login-section' className="navbar navbar-expand-lg bg-body-tertiary ms-4 me-4 mt-3 mb-4 p-2">
      <div className="container-fluid d-flex align-items-center">


        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="menuBurger"><i className="fas fa-bars"></i></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-end ">

            <li className="nav-item">
              <a className="nav-link scroll-smooth" aria-current="page" href="#roadmap-section">Road map</a>
            </li>
            <li className="nav-item">
              <Link to={"/about"} className="nav-link">About us</Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  )

  const userNavbar = (
    <div id="nav-bar">
      <input id="nav-toggle" checked={checked} type="checkbox" onClick={() => toggleLogOut(!checked)} />
      <div id="nav-header">
        <div id="nav-title" target="_blank">
          <Link to={"/modules"} className="text-primary navbar-title ms-2" aria-current="page" href="#">CodeMind</Link>
        </div>
        <label htmlFor="nav-toggle">
          <span id="nav-toggle-burger"></span>
        </label>
        <hr />
      </div>
      <div id="nav-content">
        <div className="nav-button">
          <Link to="/modules"><i className="fas fa-palette"></i><span>Modules</span> </Link>
        </div>
        {/* <div className="nav-button">
          <i className="fas fa-images"></i><span>Library</span>
        </div> */}
        <hr />

        <div className="nav-button">
          <Link to="/progress"><i className="fas fa-chart-line"></i><span>Progress</span> </Link>
        </div>

        <div className="nav-button">
          <Link to="/roadMap"> <i className="fas fa-fire"></i><span>Road Map</span> </Link>
        </div>
        <div className="nav-button">
          <Link to="/about"><i className="fas fa-heart"></i><span>About Us</span> </Link>
        </div>
        <div id="nav-content-highlight"></div>
      </div>

      <input id="nav-footer-toggle" type="checkbox" checked={checkedTwo} onClick={() => setCheckedTwo(!checkedTwo)} />
      <div id="nav-footer">
        <div id="nav-footer-heading" className="d-flex align-items-start">
          <div id="nav-footer-avatar">
            <Link to={"/profile"}><img src={userImg} alt="Avatar" className="rounded-circle" /></Link>
          </div>
          <div id="nav-footer-titlebox" className={`ms-2 ${shouldHide ? 'hide-element' : ''}`}>
        
            <Link to={"/profile"}>{user && user.firstName ? user.firstName : null} {user && user.lastName ? user.lastName : null}</Link>
      
            <div>
              <span id="nav-footer-subtitle">{user && user.role ? user.role : null}</span>
            </div>
          </div>
          <label htmlFor="nav-footer-toggle">
            <i className="fas fa-caret-up"></i>
          </label>
        </div>
        <div id="nav-footer-content">
          <div className="nav-item pt-4">
            <Link to={"/"} className="btn btn-outline-primary d-flex justify-content-center" onClick={handleLogout} >Log out</Link>
          </div>
        </div>
      </div>
    </div>)

  const navbarlite = (
    <div className="sticky-top d-flex justify-content-end">
      <button
        id="nav-toggle"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0)', border: 'none' }}
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasTop"
        aria-controls="offcanvasTop"
      >
        <i className="fas fa-bars btn rounded-3 bg-primary" style={{ minWidth: "50px", minHeight: "30px" }}></i>
      </button>

      <div
        className="offcanvas offcanvas-top"
        tabIndex="-1"
        id="offcanvasTop"
        aria-labelledby="offcanvasTopLabel"
        style={{ height: '40vh', backgroundColor: '#333' }}
      >
        <div className="offcanvas-header">
          <Link to={"/modules"} className="text-primary navbar-title" aria-current="page" href="#">
            CodeMind
          </Link>
          <hr />
          <Link to={"/profile"}>
            {user && user.firstName ? user.firstName : null} {user && user.lastName ? user.lastName : null}
          </Link>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <hr className="orange-hr" />
        <div className="offcanvas-body">
          <div className="d-flex flex-wrap">
            <div className="nav-button col-4 col-md-3">
              <Link to="/modules"><i className="fas fa-palette"></i><span>Modules</span></Link>
            </div>
            {/* <div className="nav-button col-4 col-md-3">
            <i className="fas fa-images"></i><span>Library</span>
          </div> */}
            <div className="nav-button col-4 col-md-3">
              <Link to="/progress"><i className="fas fa-chart-line"></i><span>Progress</span></Link>
            </div>
            <div className="nav-button col-4 col-md-3">
              <Link to="/roadMap"><i className="fas fa-fire"></i><span>Road Map</span></Link>
            </div>
            <div className="nav-button col-4 col-md-3">
              <Link to="/about"><i className="fas fa-heart"></i><span>About Us</span></Link>
            </div>
            <hr />
            <Link to={"/"} className="btn btn-outline-primary d-flex justify-content-center" onClick={handleLogout}>
              Log out
            </Link>
          </div>
        </div>
      </div>
    </div>
  )


  const teacherNavbar = (
    <div id="nav-bar">
      <input id="nav-toggle" type="checkbox" />
      <div id="nav-header">
        <div id="nav-title" target="_blank">
          <Link to={"/modules"} className="text-primary font-weight-bold ms-3" aria-current="page" href="#">CodeMind</Link>
        </div>
        <label htmlFor="nav-toggle">
          <span id="nav-toggle-burger"></span>
        </label>
        <hr />
      </div>
      <div id="nav-content">
        <div className="nav-button">
        <Link to={"/modules"}><i className="fas fa-palette"></i><span>Modules</span></Link>
        </div>
        {/* <div className="nav-button">
          <i className="fas fa-images"></i><span>Library</span>
        </div> */}
        <div className="nav-button">
          <Link to={"/student"}><i className="fa-solid fa-user-group p-3"></i><span>Students</span></Link>
        </div>
        <hr />
        {/* <div className="nav-button">
          <i className="fas fa-chart-line"></i><span>Progress</span>
        </div> */}
        <div className="nav-button">
        <Link to={"/roadmap"}><i className="fas fa-fire"></i><span>Road Map</span></Link>
        </div>
        <div className="nav-button">
        <Link to={"/about"}><i className="fas fa-heart"></i><span>About Us</span></Link>
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
        <div id="nav-footer-heading" className="d-flex align-items-start">
          <div id="nav-footer-avatar">
            <Link to={"/profile"}><img src={userImg} alt="Avatar" className="rounded-circle" /></Link>
          </div>
          <div id="nav-footer-titlebox" className={`ms-2 ${shouldHide ? 'hide-element' : ''}`}>
            
              <Link to={"/profile"}>{user && user.firstName ? user.firstName : null} {user && user.lastName ? user.lastName : null}</Link>
        
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
            <button className="btn btn-outline-primary" onClick={handleLogout} >Log out</button>
          </div>

        </div>
      </div>
    </div>
  )

  const navbarliteTeacher = (
    <div className="sticky-top d-flex justify-content-end">
      <button
        id="nav-toggle"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0)', border: 'none' }}
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasTop"
        aria-controls="offcanvasTop"
      >
        <i className="fas fa-bars btn rounded-3 bg-primary" style={{ minWidth: "50px", minHeight: "30px" }}></i>
      </button>

      <div
        className="offcanvas offcanvas-top"
        tabIndex="-1"
        id="offcanvasTop"
        aria-labelledby="offcanvasTopLabel"
        style={{ height: '40vh', backgroundColor: '#333' }}
      >
        <div className="offcanvas-header">
          <Link to={"/modules"} className="text-primary navbar-title" aria-current="page" href="#">
            CodeMind
          </Link>
          <hr />
          <Link to={"/profile"}>
            {user && user.firstName ? user.firstName : null} {user && user.lastName ? user.lastName : null}
          </Link>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <hr className="orange-hr" />
        <div className="offcanvas-body">
          <div className="d-flex flex-wrap">
            <div className="nav-button col-4 col-md-3">
              <Link to="/modules"><i className="fas fa-palette"></i><span>Modules</span></Link>
            </div>
            <div className="nav-button col-4 col-md-3">
              <Link to={"/student"}><i className="fa-solid fa-user-group"></i><span>Students</span></Link>
            </div>
            {/* <div className="nav-button col-4 col-md-3">
            <i className="fas fa-images"></i><span>Library</span>
          </div> */}
            {/* <div className="nav-button col-4 col-md-3">
              <Link to="/progress"><i className="fas fa-chart-line"></i><span>Progress</span></Link>
            </div> */}
            <div className="nav-button col-4 col-md-3">
              <Link to="/roadMap"><i className="fas fa-fire"></i><span>Road Map</span></Link>
            </div>
            <div className="nav-button col-4 col-md-3">
              <Link to="/about"><i className="fas fa-heart"></i><span>About Us</span></Link>
            </div>
            <hr />
            <Link to={"/"} className="btn btn-outline-primary d-flex justify-content-center" onClick={handleLogout}>
              Log out
            </Link>
          </div>
        </div>
      </div>
    </div>
  )


  const renderNavbarBasedOnRole = () => {
    const screenWidth = window.innerWidth;
    if (['/registro', '/', '/login', '/forwotpassword', '/sendpassword', '/changepassword'].includes(navActive)) {
      return defaultNavbar;
    } else if (user && user.role === 'alumno' && screenWidth <= 768) {
      return navbarlite;
    } else if (user && user.role === 'alumno') {
      return userNavbar;
    }  else if (user && user.role === 'teacher' && screenWidth <= 768) {
      return navbarliteTeacher;
    }else if (user && user.role === 'teacher') {
      return teacherNavbar;
    }
  };

  return (
    <>
      {renderNavbarBasedOnRole()}
    </>
  );
};
