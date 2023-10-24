import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/index.css";
import { Navbar } from "../component/navbar.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faPaintBrush, faLaptopCode } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const Modulos = () => {
  const { store, actions } = useContext(Context);

  const [moduleDescriptions, setModuleDescriptions] = useState({
    html5: "Unlock the potential of HTML5, the foundation of modern web development. Create dynamic, interactive web content and stay ahead in the digital era.",
    css: "Discover the art of web design with CSS. Transform ordinary websites into visually stunning, stylish creations that leave a lasting impression.",
    javascript: "Unlock the power of JavaScript and bring your websites to life with dynamic and interactive features. Join the JavaScript journey today!"
  });

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

        <div className="col text-center">
          <h2 className="module-title mb-4">
            ¡Explore Our Modules!
          </h2>
          <div className="d-flex align-items-center justify-content-center">
            <FontAwesomeIcon icon={faCode} className="mr-2" style={{ fontSize: '2em', color: 'blue' }} />
            <FontAwesomeIcon icon={faPaintBrush} className="mr-2" style={{ fontSize: '2em', color: 'green' }} />
            <FontAwesomeIcon icon={faLaptopCode} className="mr-2" style={{ fontSize: '2em', color: 'red' }} />
          </div>
        </div>
      </div>

      <div className="modules-container row align-items-start d-flex justify-content-around ">
        {/* Módulo HTML5 */}
        <div className={`col-sm-12 col-md-4 mb-5 ${descriptionsVisible.html5 ? 'show-description' : ''}`} style={{ width: "16rem" }}>
          <div className="card text-center mb-3" style={{ boxShadow: "0 0 50px #4f9" }}>
            <div className="card-body d-flex justify-content-center align-items-center">
              <img
                src="https://generation-sessions.s3.amazonaws.com/ad60b588835c42a878fbc4ab00aaadec/img/html5-logo-and-wordmark-1@2x.png"
                className="card-img-top card-animation img-fluid mb-2"
                alt="HTML5 Logo"
                style={{ maxWidth: "150px", maxHeight: "150px" }}
              />
            </div>
            <div className="card-footer">
              <Link to={`/preguntas/html`}>
                <button className="css-button-shadow-border--black px-5 py-2 mb-4">
                  Start
                </button>
              </Link>
              <button
                onClick={() => toggleDescription("html5")}
                className="btn btn-outline-primary text-decoration-none"
                data-bs-toggle="button"
                autoComplete="off"

              >
                {descriptionsVisible.html5 ? "Hide Description" : "Show Description"}
              </button>
            </div>
            {descriptionsVisible.html5 && (
              <div className="card-description">
                <h5 className="p-2 fs-6 text-secondary fst-italic lh-1">{moduleDescriptions.html5}</h5>
              </div>
            )}
          </div>
        </div>

        {/* Módulo CSS */}
        <div className={`col-sm-12 col-md-4 mb-5 ${descriptionsVisible.css ? 'show-description' : ''}`} style={{ width: "16rem" }}>
          <div className="card text-center mb-3" style={{ boxShadow: "0 0 50px #4f9" }}>
            <div className="card-body d-flex justify-content-center align-items-center">
              <img
                src="https://generation-sessions.s3.amazonaws.com/ad60b588835c42a878fbc4ab00aaadec/img/1200px-css-3-1@2x.png"
                className="card-img-top card-animation img-fluid mb-2"
                alt="CSS Logo"
                style={{ maxWidth: "150px", maxHeight: "150px" }}
              />
            </div>
            <div className="card-footer">
              <Link to={`/preguntas/css`}>
                <button className="css-button-shadow-border--black px-5 py-2 mb-4">
                  Start
                </button>
              </Link>
              <button
                onClick={() => toggleDescription("css")}
                className="btn btn-outline-primary text-decoration-none"
                data-bs-toggle="button"
                autoComplete="off"
              >
                {descriptionsVisible.css ? "Hide Description" : "Show Description"}
              </button>
            </div>
            {descriptionsVisible.css && (
              <div className="card-description ">
                <h5 className="p-2 fs-6 text-secondary fst-italic lh-1">{moduleDescriptions.css}</h5>
              </div>
            )}
          </div>
        </div>

        {/* Módulo JavaScript */}
        <div className={`col-sm-12 col-md-4 mb-5 ${descriptionsVisible.javascript ? 'show-description' : ''}`} style={{ width: "16rem" }}>
          <div className="card text-center mb-3" style={{ boxShadow: "0 0 50px #4f9" }}>
            <div className="card-body d-flex justify-content-center align-items-center">
              <img
                src="https://generation-sessions.s3.amazonaws.com/ad60b588835c42a878fbc4ab00aaadec/img/unofficial-javascript-logo-2-1@2x.png"
                className="card-img-top card-animation img-fluid mb-2"
                alt="JavaScript Logo"
                style={{ maxWidth: "150px", maxHeight: "150px" }}
              />
            </div>
            <div className="card-footer">
              <Link to={`/preguntas/js`}>
                <button className="css-button-shadow-border--black px-5 py-2 mb-4">
                  Start
                </button>
              </Link>
              <button
                onClick={() => toggleDescription("javascript")}
                className="btn btn-outline-primary text-decoration-none"
                data-bs-toggle="button"
                autoComplete="off"

              >
                {descriptionsVisible.javascript ? "Hide Description" : "Show Description"}
              </button>
            </div>
            {descriptionsVisible.javascript && (
              <div className="">
                <h5 className="p-2 fs-6 text-secondary fst-italic lh-1">{moduleDescriptions.javascript}</h5>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
