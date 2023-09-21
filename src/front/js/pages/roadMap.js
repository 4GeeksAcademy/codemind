import React, { useContext } from "react";
import { Context } from "../store/appContext";
import pythonLogo from "../../img/Python-logo.png";
import flaskLogo from "../../img/flask-logo.png";
import jwtLogo from "../../img/jwt-logo.png";
import sqlaLogo from "../../img/SQLA.png";
import reactLogo from "../../img/react-logo.png";
import flechaDerecha from "../../img/Arrow15.png";
import flechaIzquierda from "../../img/Arrow14.png";
import flechaVertical from "../../img/Arrow13.png";
import "../../styles/home.css";
import { Navbar } from "../component/navbar.js";

export const RoadMap = () => {
  const { store, actions } = useContext(Context);

  return (
    <section className="w-100 d-flex align-items-center justify-content-center bg">
      <div className="container">
        <div className="row mb-5">
          <div className="col text-center mb-5">
          <h2 className="text-center text-color-primary mt-4 mb-4 logintitle">
                &#60;Road<span className="text-line">Map/&#62;</span>
              </h2>
          </div>
        </div>
          <div className="row">
            <div className="col-2 card-body d-flex justify-content-center align-items-center p-0">
              <img
                src="https://generation-sessions.s3.amazonaws.com/ad60b588835c42a878fbc4ab00aaadec/img/html5-logo-and-wordmark-1@2x.png"
                className="card-img-top img-fluid"
                alt="HTML5 Logo"
                style={{ maxWidth: "150px", maxHeight: "150px" }}
              />
            </div>
            <div className="col-3 card-body d-flex justify-content-center align-items-center ">
              <img
                src={flechaDerecha}
                className="card-img-top img-fluid"
                alt="flechaDerecha"
                style={{ maxWidth: "150px", maxHeight: "150px" }}
              />
            </div>
            <div className="col-2 card-body d-flex justify-content-center align-items-center p-0">
              <img src="https://generation-sessions.s3.amazonaws.com/ad60b588835c42a878fbc4ab00aaadec/img/1200px-css-3-1@2x.png"
                className="card-img-top img-fluid"
                alt="CSS3 Logo"
                style={{ maxWidth: "150px", maxHeight: "150px" }}
              />
            </div>
            <div className="col-3 card-body d-flex justify-content-center align-items-center">
              <img
                src={flechaDerecha}
                className="card-img-top img-fluid"
                alt="flechaDerecha"
                style={{ maxWidth: "150px", maxHeight: "150px" }}
              />
            </div>
            <div className="col-2 card-body d-flex justify-content-center align-items-center p-0">
              <img src="https://generation-sessions.s3.amazonaws.com/ad60b588835c42a878fbc4ab00aaadec/img/unofficial-javascript-logo-2-1@2x.png"
                className="card-img-top img-fluid"
                alt="JavaScript Logo"
                style={{ maxWidth: "150px", maxHeight: "150px" }}
              />
            </div>
          </div>
        <div className="row"> 
          <div className="col-10"></div>
          <div className="col-2 d-flex justify-content-center my-4">
            <img
              src={flechaVertical}
              className="img-fluid"
              alt="flechaVertical"
              style={{ maxWidth: "150px", maxHeight: "100px" }}
            />
          </div>
        </div>
          <div className="row">
            <div className="col-2 card-body d-flex justify-content-center align-items-center p-0">
              <img src={sqlaLogo}
                className="card-img-top img-fluid"
                alt="SQLA Logo"
                style={{ maxWidth: "150px", maxHeight: "150px" }}
              />
            </div>
            <div className="col-3 card-body d-flex justify-content-center align-items-center">
              <img
                src={flechaIzquierda}
                className="card-img-top img-fluid"
                alt="flechaIzquierda"
                style={{ maxWidth: "150px", maxHeight: "150px" }}
              />
            </div>
            <div className="col-2 card-body d-flex justify-content-center align-items-center p-0">
              <img src={pythonLogo}
                className="card-img-top img-fluid"
                alt="Python Logo"
                style={{ maxWidth: "150px", maxHeight: "150px" }}
              />
            </div>
            <div className="col-3 card-body d-flex justify-content-center align-items-center">
              <img
                src={flechaIzquierda}
                className="card-img-top img-fluid"
                alt="flechaIzquierda"
              style={{ maxWidth: "150px", maxHeight: "150px" }}
              />
            </div>
            <div className="col-2 card-body d-flex justify-content-center align-items-center p-0">
              <img src={reactLogo}
                className="card-img-top img-fluid"
                alt="React Logo"
                style={{ maxWidth: "150px", maxHeight: "150px" }}
              />
            </div>
          </div>
          <div className="row"> 
          <div className="col-2 d-flex justify-content-center my-4">
            <img
              src={flechaVertical}
              className="img-fluid"
              alt="flechaVertical"
              style={{ maxWidth: "150px", maxHeight: "100px" }}
            />
          </div>
          <div className="col-10"></div>
        </div>
          
          <div className="row">
            <div className="col-2 card-body">
              <img src={flaskLogo}
                className="card-img-top img-fluid ms-4"
                alt="Flask Logo"
                style={{ maxWidth: "150px", maxHeight: "150px" }}
              />
            </div>
            <div className="col-3 card-body d-flex justify-content-center align-items-center">
              <img
                src={flechaDerecha}
                className="card-img-top img-fluid"
                alt="flechaDerecha"
                style={{ maxWidth: "150px", maxHeight: "150px" }}
              />
            </div>
            <div className="col-2 card-body d-flex justify-content-center align-items-center p-0">
              <img src={jwtLogo}
                className="card-img-top img-fluid"
                alt="JWT Logo"
                style={{ maxWidth: "150px", maxHeight: "150px" }}
              />
            </div>
            <div className="col-5 card-body"></div>
          </div>
      </div>
      </section>
  );
};
