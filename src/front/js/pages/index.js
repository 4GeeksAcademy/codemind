import React from 'react';
import logoCM from "../../img/LOGO.png";
import "../../styles/index.css";
import "../letras.js";

export const Index = () => {
    return (
        <div className="container-fluid h-100 overflow-hidden mt-2"> 
            <div className="row h-100 justify-content-center align-items-center mt-5">
                <div className="col-12 col-sm-6 d-flex justify-content-center">
                    <div className="img-index">
                        <img src={logoCM} alt="Logo" className="img-fluid" />
                    </div>
                </div>
                <div className="col-12 col-sm-6 d-flex align-items-center">
                    <div>
                        <h1 className="text-start text-wrap">CodeMind</h1>
                        <div className="">
                            <h3>
                                <a href="" className="typewrite ms-2" data-period="2000" data-type='[ "Aprende", "Disfruta", "Escribe Codigo", "Practica" ]'>
                                    <span className="wrap ms-3"></span>
                                </a>
                            </h3>
                        </div>
                        <div className="buttons text-center mt-4 ">
                            <button type="button" className="btn btn-primary rounded-pill mt-4 mb-2" style={{ minWidth: "30em" }}>Login</button>
                            <button type="button" className="btn btn-outline-info rounded-pill" style={{ minWidth: "30em" }}>Sign up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
