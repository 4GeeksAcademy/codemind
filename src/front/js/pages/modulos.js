import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/index.css";
import { Navbar } from "../component/navbar.js";
import { Link, useNavigate } from "react-router-dom";

export const Modulos = () => {
  const { store, actions } = useContext(Context);

  return (
    <section className="vh-100 d-flex align-items-center justify-content-center bg">
      <div className="container vh-100 align-items-center text-break">
        <div className="row mb-4">
          <div className="col ">
            <h2 className="text-center text-color-primary mt-4 mb-4 logintitle">
              &#60;ModuleTos
              <span className="text-line">Learn/&#62;</span>
            </h2>
          </div>
        </div>

        <div className="row justify-content-center d-flex justify-content-around align-items-center ">
          <div className="col-sm-12 col-md-4" style={{ width: "16rem" }}>
            <div className="card text-center mb-3 border border-dark">
              <div className="card-body d-flex justify-content-center align-items-center ">
                <img
                  src="https://generation-sessions.s3.amazonaws.com/ad60b588835c42a878fbc4ab00aaadec/img/html5-logo-and-wordmark-1@2x.png"
                  className="card-img-top img-fluid mb-2"
                  alt="HTML5 Logo"
                  style={{ maxWidth: "150px", maxHeight: "150px" }}
                />
              </div>
              <div className="card-footer">
                <button
                  type="button"
                  className="btnsignup btn-lg"
                  style={{ minWidth: "5em" }}
                >
                  Start
                </button>
              </div>
            </div>
          </div>

          <div className="col-sm-12 col-md-4" style={{ width: "16rem" }}>
            <div className="card text-center mb-3 border border-dark">
              <div className="card-body d-flex justify-content-center align-items-center">
                <img
                  src="https://generation-sessions.s3.amazonaws.com/ad60b588835c42a878fbc4ab00aaadec/img/1200px-css-3-1@2x.png"
                  className="card-img-top img-fluid mb-2"
                  alt="CSS Logo"
                  style={{ maxWidth: "150px", maxHeight: "150px" }}
                />
              </div>
              <div className="card-footer">
              <button
                  type="button"
                  className="btnsignup btn-lg"
                  style={{ minWidth: "5em" }}
                >
                  Start
                </button>
              </div>
            </div>
          </div>

          <div className="col-sm-12 col-md-4" style={{ width: "16rem" }}>
            <div className="card text-center mb-3 border border-dark">
              <div className="card-body d-flex justify-content-center align-items-center">
                <img
                  src="https://generation-sessions.s3.amazonaws.com/ad60b588835c42a878fbc4ab00aaadec/img/unofficial-javascript-logo-2-1@2x.png"
                  className="card-img-top img-fluid mb-2"
                  alt="JavaScript Logo"
                  style={{ maxWidth: "150px", maxHeight: "150px" }}
                />
              </div>
              <div className="card-footer">
              <button
                  type="button"
                  className="btnsignup btn-lg"
                  style={{ minWidth: "5em" }}
                >
                  Start
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
