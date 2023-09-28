import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/index.css";
import { Navbar } from "../component/navbar.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCode, faPaintBrush, faLaptopCode } from "@fortawesome/free-solid-svg-icons";

import {Link} from "react-router-dom";


export const Modulos = () => {
  const { store, actions } = useContext(Context);

  // Estado para controlar la visibilidad de las descripciones de los módulos
  const [descriptionsVisible, setDescriptionsVisible] = useState({
    html5: false,
    css: false,
    javascript: false,
  });

  // Función para cambiar la visibilidad de las descripciones de los módulos
  const toggleDescription = (moduleName) => {
    setDescriptionsVisible((prevState) => ({
      ...prevState,
      [moduleName]: !prevState[moduleName],
    }));
  };

  return (
    <div className="container vh-100 align-items-center text-break">
      <div className="row mb-4">
        <div className="col">
          <h2 className="module-title text-center mb-4">
            <FontAwesomeIcon icon={faCode} className="mr-2 animated bounceInLeft" />
            <FontAwesomeIcon icon={faPaintBrush} className="mr-2 animated bounceInUp" />
            <FontAwesomeIcon icon={faLaptopCode} className="mr-2 animated bounceInRight" />
            ¡Explora Nuestros Módulos!
          </h2>
        </div>
      </div>

      <div className="row justify-content-center d-flex justify-content-around align-items-center">
        {/* Módulo HTML5 */}
        <div className="col-sm-12 col-md-4" style={{ width: "16rem" }}>
          <div className="card text-center mb-3">
            <div className="card-body d-flex justify-content-center align-items-center">
              <img
                src="https://generation-sessions.s3.amazonaws.com/ad60b588835c42a878fbc4ab00aaadec/img/html5-logo-and-wordmark-1@2x.png"
                className="card-img-top card-animation img-fluid mb-2"
                alt="HTML5 Logo"
                style={{ maxWidth: "150px", maxHeight: "150px" }}
              />
            </div>
            <div className="card-footer">
            <Link to ={`/preguntas/html`}>
              <button className="css-button-shadow-border--black px-5 py-2 mb-4">
                Start
              </button>
            </Link>
              <button
                onClick={() => toggleDescription("html5")}
                className="btn btn-link"
              >
                {descriptionsVisible.html5 ? "Ocultar Descripción" : "Mostrar Descripción"}
              </button>
            </div>
            {descriptionsVisible.html5 && (
              <div className="card-body">
                <p>Descripción breve del módulo HTML5.</p>
              </div>
            )}
          </div>
        </div>

        {/* Módulo CSS */}
        <div className="col-sm-12 col-md-4" style={{ width: "16rem" }}>
          <div className="card text-center mb-3">
            <div className="card-body d-flex justify-content-center align-items-center">
              <img
                src="https://generation-sessions.s3.amazonaws.com/ad60b588835c42a878fbc4ab00aaadec/img/1200px-css-3-1@2x.png"
                className="card-img-top card-animation img-fluid mb-2"
                alt="CSS Logo"
                style={{ maxWidth: "150px", maxHeight: "150px" }}
              />
            </div>
            <div className="card-footer">
            <Link to ={`/preguntas/css`}>
              <button className="css-button-shadow-border--black px-5 py-2 mb-4">
                Start
              </button>
            </Link>
              <button
                onClick={() => toggleDescription("css")}
                className="btn btn-link"
              >
                {descriptionsVisible.css ? "Ocultar Descripción" : "Mostrar Descripción"}
              </button>
            </div>
            {descriptionsVisible.css && (
              <div className="card-body">
                <p>Descripción breve del módulo CSS.</p>
              </div>
            )}
          </div>
        </div>


        {/* Módulo JavaScript */}
        <div className="col-sm-12 col-md-4" style={{ width: "16rem" }}>
          <div className="card text-center mb-3">
            <div className="card-body d-flex justify-content-center align-items-center">
              <img
                src="https://generation-sessions.s3.amazonaws.com/ad60b588835c42a878fbc4ab00aaadec/img/unofficial-javascript-logo-2-1@2x.png"
                className="card-img-top card-animation img-fluid mb-2"
                alt="JavaScript Logo"
                style={{ maxWidth: "150px", maxHeight: "150px" }}
              />
            </div>
            <div className="card-footer">
            <Link to ={`/preguntas/js`}>
              <button className="css-button-shadow-border--black px-5 py-2 mb-4">
                Start
              </button>
            </Link>
              <button
                onClick={() => toggleDescription("javascript")}
                className="btn btn-link"
              >
                {descriptionsVisible.javascript ? "Ocultar Descripción" : "Mostrar Descripción"}
              </button>
            </div>
            {descriptionsVisible.javascript && (
              <div className="card-body">
                <p>Descripción breve del módulo JavaScript.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

  );
};
