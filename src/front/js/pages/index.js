import React from 'react';
import logoCM from "../../img/LOGO.png";
import "../../styles/index.css";
import "../letras.js";
import { Link } from 'react-router-dom';

export const Index = () => {
    return (
        <div className="container d-flex justify-content-between">
            <div className="row vh-100  align-items-center">
                <div className="col-md-6 text-center">
                    <div className="embed-responsive embed-responsive-16by9">
                        <img src={logoCM} alt="Logo" className="embed-responsive-item img-fluid" />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="">
                        <h1 className="text-center">CodeMind</h1>

                        <h4>
                            <a href="" className="typewrite ms-2" data-period="2000" data-type='[ "Aprende", "Disfruta", "Escribe Codigo", "Practica" ]'>
                                <span className="wrap ms-3"></span>
                            </a>
                        </h4>

                        <div className='row d-flex'>
                            <Link to="/login">
                                <button type="button" className="btn btn-outline-info rounded-pill w-100 w-md-auto mb-2 mt-2" style={{ maxWidth: "30em" }}>Log in</button>
                            </Link>
                            <div className="col-sm-12">
                                <Link to="/registro">
                                    <button type="button" className="btn btn-outline-info rounded-pill w-100 w-md-auto" style={{ maxWidth: "30em" }}>Sign up</button>
                                </Link>
                            </div>
                        </div>

                        <div className='text-center mt-3'>
                            <Link to="/forwotpassword"><a>Forgot your password?</a></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}