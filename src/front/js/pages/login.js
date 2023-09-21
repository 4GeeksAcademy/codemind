import React, { useContext, useState } from "react";
import "../../styles/index.css";
import logoCM from "../../img/LOGO.png";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
  const { store } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState(null);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Aquí debes comparar el email y la contraseña con los datos almacenados en el store.
    const { user } = store;
    if (user && user.email === email && user.password === password) {
      // Iniciar sesión exitosa
      navigate("/modules");
    } else {
      // Iniciar sesión fallida
      setErrorLogin("Inicio de sesión fallido. Verifique sus credenciales.");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center bg">
      <div className="container borderlogin">
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-center align-items-center mb-4 flex-column">
              <h2 className="text-center text-color-primary mt-4 mb-4 logintitle">
                &#60;Log<span className="text-line">in/&#62;</span>
              </h2>
              <form className="align-items-center justify-content-center" onSubmit={handleLogin}>
                <div className="col-md-12">
                  {errorLogin && (
                    <div
                      className="alert alert-danger alert-dismissible fade show mb-2"
                      role="alert"
                      style={{ maxWidth: "100%", margin: "0 auto" }}
                    >
                      <div className="d-flex align-items-center">
                        <i className="fa-solid fa-triangle-exclamation fs-2 fw-bold text-danger me-2"></i>
                        <div>{errorLogin}</div>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="alert"
                          aria-label="Close"
                        ></button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="form-outline mb-4">
                  <label htmlFor="inputEmailLogin">E-mail:</label>
                  <input
                    type="email"
                    id="inputEmailLogin"
                    className="form-control form-control-lg mt-2"
                    placeholder="Email address"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
                <div className="form-outline mb-5">
                  <label htmlFor="inputPasswordLogin">Password:</label>
                  <input
                    type="password"
                    id="inputPasswordLogin"
                    className="form-control form-control-lg mt-2"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btnlogin mb-2 btn-lg"
                    style={{ minWidth: "15em" }}
                  >
                    Log in
                  </button>
                  <Link to="/registro">
                    <button
                      type="button"
                      className="btnsignup btn-lg"
                      style={{ minWidth: "15em" }}
                    >
                      Sign up
                    </button>
                  </Link>
                </div>
                <div className="text-center mb-3 mt-3">
                  <p className="text-center fw-bold mx-3 mb-0 text-muted small">
                    OR
                  </p>
                </div>
                <div className="text-center mb-3">
                  <Link to="/forwotpassword" className="itemnav">
                    Forgot your password?
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
