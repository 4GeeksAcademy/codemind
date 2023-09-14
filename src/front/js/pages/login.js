import React from "react";
import "../../styles/index.css";
import logoCM from "../../img/LOGO.png";
import { Link } from 'react-router-dom';

export const Login = () => {
    return (
        <section className="vh-100 d-flex align-items-center justify-content-start">
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
                    <div className="col-md-8 col-lg-5 col-xl-6 col-md-2 col-lg-5 col-xl-3 order-1 order-md-2">
                        <div className="d-flex justify-content-center align-items-center mb-4 flex-column">
                            <form className="ms-4">
                                <div className="form-outline mb-4">
                                    <input
                                        type="email"
                                        id="inputEmailLogin"
                                        className="form-control form-control-sm"
                                        placeholder="Email address"
                                    />
                                </div>
                                <div className="form-outline mb-5">
                                    <input
                                        type="password"
                                        id="inputPasswordLogin"
                                        className="form-control form-control-sm"
                                        placeholder="Password"
                                    />
                                </div>
                                <div className="text-center">
                                    <Link to="/login"><button type="button" className="btn btn-outline-info rounded-pill mb-2" style={{ minWidth: "15em" }}>Log in</button></Link>
                                    <Link to="/registro"><button type="button" className="btn btn-outline-info rounded-pill" style={{ minWidth: "15em" }}>Sign up</button></Link>
                                </div>
                                <div className="text-center mb-3 mt-3">
                                    <p className="text-center fw-bold mx-3 mb-0 text-muted small">OR</p>
                                </div>

                                <div className="text-center mb-3"> {/* Nuevo div para centrar solo estos elementos */}
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
    );
};
