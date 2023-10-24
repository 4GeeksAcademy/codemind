import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Context } from "./store/appContext";
import { Index } from "./pages/index";
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
import { PreguntaCompletar } from "./pages/ejerciciosPorModulo";
import { Ejercicios } from "./pages/ejercicios";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Registro } from "./pages/registro";
import { Login } from "./pages/login";
import { DragAndDropList } from "./pages/dragAndDropList";
import { Landing } from "./pages/landing";
import { Progress } from "./pages/progress";
import { NotFound } from "./pages/NotFound";

//create your first component
const Layout = () => {
  const { store, actions } = useContext(Context);
  const basename = process.env.BASENAME || "";
  const [token, setToken] = useState();

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "")
    return <BackendURL />;

  useEffect(() => {
    if (!store.token) {
      setToken(store.token);
      
    }
  }, [store.token]);

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />

          <Routes>
            <Route element={<Landing />} path="/" />
            <Route element={<Index />} path="/Index" />
            <Route element={<Registro />} path="/registro" />
            <Route element={<Login />} path="/login" />
            <Route element={<ChangePassword />} path="/changepassword"/>
            <Route element={<ForwotPassword />} path="/forwotpassword" />
            <Route element={<SendPassword />} path="/sendpassword" />
            <Route element={<AboutUs />} path="/about" />
            <Route element={<RoadMap />} path="/roadmap" />
            {store.token ? (
              <>
                <Route element={<Profile />} path="/profile" />
                <Route element={<Modulos />} path="/modules" />
                <Route element={<CreateExcercise />} path="/createexcercise" />
                <Route element={<DragAndDropList />} path="/dragAndDropList" />
                <Route element={<Student />} path="/student" />
                <Route element={<Usuarios />} path="/usuarios" />
                <Route
                  element={<PreguntaCompletar />}
                  path="/preguntas/:modulo/:theid"
                />
                <Route element={<Ejercicios />} path="/preguntas/:modulo" />
                <Route element={<Demo />} path="/demo" />
                <Route element={<Single />} path="/single/:theid" />
                <Route element={<Progress />} path="/progress" />
              </>
              
            ):null}

            <Route element={<NotFound/>} path="*"/>
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default injectContext(Layout);
