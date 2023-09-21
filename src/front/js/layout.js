import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Index } from "./pages/index"
import { Modulos } from "./pages/modulos";
import { CreateExcercise } from "./pages/createexcercise";
import { Profile } from "./pages/profile";
import { ChangePassword } from "./pages/changePassword";
import { ForwotPassword } from "./pages/forwotpassword";
import { SendPassword } from "./pages/sendpassword";
import { Student } from "./pages/student";
import { Usuarios } from "./pages/usuarios";
import { AboutUs } from "./pages/aboutUs";
import { RoadMap } from "./pages/roadMap";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import { Navbar } from "./component/navbar2";
import { Footer } from "./component/footer";
import { Registro } from "./pages/registro";
import { Login } from "./pages/login";
import { DragAndDropList } from "./pages/dragAndDropList";
import { Landing } from "./pages/landing";

//create your first component
const Layout = () => {
    const basename = process.env.BASENAME || "";
  
    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;
  
    // Define una función para verificar si la ruta actual es la página de registro
    // const isRegistroPage = window.location.pathname === '/registro';
    // const isIndexPage = window.location.pathname === '/';
    // const isLoginPage = window.location.pathname === '/login';
    // const isforwotpassword = window.location.pathname === '/forwotpassword';
    // const isSendpassword = window.location.pathname === '/sendpassword';
    return (
      <div>
        <BrowserRouter basename={basename}>
          <ScrollToTop>
            {/* Renderiza el Navbar solo si la ruta actual no es la página de registro */}
        
            {/* {!isLoginPage &&!isRegistroPage && !isIndexPage && !isforwotpassword && !isSendpassword && } */}
            {/* <Navbar /> */}
            <Routes>
              <Route element={<Landing />} path="/" />
              <Route element={<Index />} path="/Index" />
              <Route element={<Registro />} path="/registro" />
              <Route element={<Login />} path="/login" />
              <Route element={<Profile />} path="/profile" />
              <Route element={<ChangePassword />} path="/changepassword" />
              <Route element={<ForwotPassword />} path="/forwotpassword" />
              <Route element={<SendPassword />} path="/sendpassword" />
              <Route element={<Modulos />} path="/modules" />
              <Route element={<CreateExcercise />} path="/createexcercise" />
              <Route element={<DragAndDropList />} path="/dragAndDropList" />
              <Route element={<Student />} path="/student" />
              <Route element={<Usuarios />} path="/usuarios" />
              <Route element={<AboutUs />} path="/about" />
              <Route element={<RoadMap />} path="/roadmap" />
              <Route element={<Demo />} path="/demo" />
              <Route element={<Single />} path="/single/:theid" />
              <Route element={<h1>Not found!</h1>} />
            </Routes>
            <Footer />
          </ScrollToTop>
        </BrowserRouter>
      </div>
    );
  };
  
  export default injectContext(Layout);
