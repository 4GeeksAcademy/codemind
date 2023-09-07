import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Index } from "./pages/index"
import { Modulos } from "./pages/modulos";
import { Profile } from "./pages/profile";
import { ChangePassword } from "./pages/changePassword";
import { ForwotPassword } from "./pages/forwotpassword";
import { SendPassword } from "./pages/sendpassword";
import { Student } from "./pages/student";
import { Usuarios } from "./pages/usuarios";
import { Presentacion } from "./pages/presentacion";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Registro } from "./pages/registro";

//create your first component
const Layout = () => {
    const basename = process.env.BASENAME || "";
  
    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;
  
    // Define una función para verificar si la ruta actual es la página de registro
    const isRegistroPage = window.location.pathname === '/registro';
    const isIndexPage = window.location.pathname === '/';
    return (
      <div>
        <BrowserRouter basename={basename}>
          <ScrollToTop>
            {/* Renderiza el Navbar solo si la ruta actual no es la página de registro */}
            {!isRegistroPage && !isIndexPage && <Navbar />}
            <Routes>
              <Route element={<Registro />} path="/registro" />
              <Route element={<Index />} path="/" />
              <Route element={<Profile />} path="/profile" />
              <Route element={<ChangePassword />} path="/changepassword" />
              <Route element={<ForwotPassword />} path="/forwotpassword" />
              <Route element={<SendPassword />} path="/sendpassword" />
              <Route element={<Modulos />} path="/modules" />
              <Route element={<Student />} path="/student" />
              <Route element={<Usuarios />} path="/usuarios" />
              <Route element={<Presentacion />} path="/presentacion" />
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
