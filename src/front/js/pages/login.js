import React, { useContext, useState } from "react";
import "../../styles/index.css";
import logoCM from "../../img/LOGO.png";
import { Link, useNavigate } from 'react-router-dom';
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
        <>
            <section className="d-flex align-items-center justify-content-start">
                <div className="container">
                    <div className="row">
                        <h2 className="text-center mb-4">Log <span className="text-color-primary">in</span></h2>
                        <div className="col-md-4 col-lg-3 col-xl-3 order-2 order-md-1">
                            <div className="d-flex justify-content-center align-items-center mb-4">
                                <div className="img-index img-logo-login mb-4">
                                    <img src={logoCM} alt="Logo" className="img-fluid" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 col-lg-5 col-xl-6 order-1 order-md-2">
                            <div className="d-flex justify-content-center align-items-center mb-4 flex-column">
                                <form className="ms-4" onSubmit={handleLogin}>
                                    <div className="col-md-12">
                                        {errorLogin && (
                                            <div className="alert alert-danger alert-dismissible fade show mb-2" role="alert" style={{ maxWidth: '100%', margin: '0 auto' }}>
                                                <div className="d-flex align-items-center">
                                                    <i className="fa-solid fa-triangle-exclamation fs-2 fw-bold text-danger me-2"></i>
                                                    <div>{errorLogin}</div>
                                                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="form-outline mb-4">
                                        <input
                                            type="email"
                                            id="inputEmailLogin"
                                            className="form-control form-control-sm"
                                            placeholder="Email address"
                                            value={email}
                                            onChange={handleEmailChange}
                                        />
                                    </div>
                                    <div className="form-outline mb-5">
                                        <input
                                            type="password"
                                            id="inputPasswordLogin"
                                            className="form-control form-control-sm"
                                            placeholder="Password"
                                            value={password}
                                            onChange={handlePasswordChange}
                                        />
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" className="btn btn-outline-info rounded-pill mb-2" style={{ minWidth: "15em" }}>Log in</button>
                                        <div className="text-center mb-3 mt-3">
                                            <p className="text-center fw-bold mx-3 mb-0 text-muted small">OR</p>
                                        </div>
                                        <Link to="/registro"><button type="button" className="btn btn-outline-info rounded-pill" style={{ minWidth: "15em" }}>Create new account</button></Link>
                                    </div>

                                    <div className="text-center mt-3">
                                        <Link to="/forwotpassword">
                                            <p><a>Forgot your password?</a></p>
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
};
