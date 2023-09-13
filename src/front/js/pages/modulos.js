import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/index.css";
import { Navbar } from "../component/navbar.js";

export const Modulos = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <div className="container">
        <div className="row mb-4">
          <div className="col text-start">
            <h2 className="module-title mb-4">Module <span className="text-line">to learn:</span></h2>
          </div>
        </div>
        <div className="row justify-content-between">
          <div className="col-md-4 "style={{ width: "18rem" }}>
            <div className="card text-center mb-3">
              <div className="card-body d-flex justify-content-center align-items-center">
                <img
                  src="https://generation-sessions.s3.amazonaws.com/ad60b588835c42a878fbc4ab00aaadec/img/html5-logo-and-wordmark-1@2x.png"
                  className="card-img-top img-fluid mb-2"
                  alt="HTML5 Logo"
                  style={{ maxWidth: "150px", maxHeight: "150px" }}
                />
              </div>
              <div className="card-footer mb-4">
                <a href="#" className="btn btn-outline-secondary mb-4">start</a></div>
            </div>
          </div>
          <div className="col-md-4" style={{ width: "18rem" }}>
            <div className="card text-center mb-3">
              <div className="card-body d-flex justify-content-center align-items-center">
                <img
                  src="https://generation-sessions.s3.amazonaws.com/ad60b588835c42a878fbc4ab00aaadec/img/1200px-css-3-1@2x.png"
                  className="card-img-top img-fluid mb-2"
                  alt="CSS3 Logo"
                  style={{ maxWidth: "150px", maxHeight: "150px" }}
                />
              </div>
              <div className="card-footer mb-4"><a href="#" className="btn btn-outline-secondary">start</a></div>
            </div>
          </div>
          <div className="col-md-4" style={{ width: "18rem" }}>
            <div className="card text-center mb-3">
              <div className="card-body d-flex justify-content-center align-items-center">
                <img
                  src="https://generation-sessions.s3.amazonaws.com/ad60b588835c42a878fbc4ab00aaadec/img/unofficial-javascript-logo-2-1@2x.png"
                  className="card-img-top img-fluid mb-2"
                  alt="JavaScript Logo"
                  style={{ maxWidth: "150px", maxHeight: "150px" }}
                />
              </div>
              <div className="card-footer mb-4"><a href="#" className="btn btn-outline-secondary">start</a></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
