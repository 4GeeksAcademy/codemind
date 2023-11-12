import "../../styles/index.css";
import React, { useEffect, useContext } from 'react';
import { Context } from '../store/appContext';

export const Progress = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getProgreso();
    actions.getProgresoGeneral();
  }, []);



  const roundedProgress = Math.round(store.progress);

  return (
    <div className="container vh-100">
      <div className="d-flex justify-content-center align-items-center m-5"><h1 className="fs-2 text-center">¡Keep going, you are almost there!</h1></div>
      <div className="row d-flex justify-content-between pt-5 pb-5">
        <div className="offset-1 col-4">
          <h3 className="text-center text-primary blockquote"><strong>Your Full Stack progress: {roundedProgress}%</strong></h3>
        </div>
        <div className="col-1"></div>
        <div className="col-6">
          <div className="progress mt-2">
            <div
              className="progress-bar progress-bar-striped bg-warning"
              role="progressbar"
              style={{ width: `${roundedProgress}%` }}
              aria-valuenow={roundedProgress}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
      </div>

      <div className="row d-flex justify-content-between align-items-center m-3 border border-dark border-2 rounded bg-gradient shadow" style={{ backgroundColor: '#18283b' }}>
        <div className="d-flex justify-content-center col-3">
          <img
            src="https://generation-sessions.s3.amazonaws.com/ad60b588835c42a878fbc4ab00aaadec/img/html5-logo-and-wordmark-1@2x.png"
            className="card-img-top card-animation img-fluid mt-2 mb-2 align-item-center"
            alt="HTML5 Logo"
            style={{ maxWidth: "90px", maxHeight: "90px" }}
          />
        </div>
        <div className="d-flex justify-content-end align-items-center col-3 mt-2">
          <h4 className="text-center blockquote">HTML5:</h4>
        </div>


        <div className="pb-3 col-5 ">
          <div className="progress mt-2">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${store.progressGeneral.progress_html}%` }}
              aria-valuenow={store.progressGeneral.progress_html}
              aria-valuemin="0"
              aria-valuemax="100"
            >{store.progressGeneral.progress_html} %</div>
          </div>
        </div>
      </div>


      <div className="row d-flex justify-content-between align-items-center m-3 border border-dark border-2 rounded bg-gradient shadow" style={{ backgroundColor: '#18283b' }}>
        <div className="d-flex justify-content-center
               col-3">
          <img
            src="https://generation-sessions.s3.amazonaws.com/ad60b588835c42a878fbc4ab00aaadec/img/1200px-css-3-1@2x.png"
            className="card-img-top card-animation img-fluid m-2 align-item-center"
            alt="CSS Logo"
            style={{ maxWidth: "90px", maxHeight: "90px" }}
          />
        </div>
        <div className="d-flex justify-content-end align-items-center col-3 mt-2">
          <h4 className="text-center blockquote">CSS:</h4>
        </div>


        <div className="col-5 pb-3 align-items-center">
          <div className="progress mt-2">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${store.progressGeneral.progress_css}%` }}
              aria-valuenow={store.progressGeneral.progress_css}
              aria-valuemin="0"
              aria-valuemax="100"
            >{store.progressGeneral.progress_css} %</div>
          </div>
        </div>
      </div>
      <div className="row d-flex justify-content-between align-items-center m-3 border border-dark border-2 rounded bg-gradient shadow" style={{ backgroundColor: '#18283b' }}>
        <div className="d-flex justify-content-center
               col-3">
          <img
            src="https://generation-sessions.s3.amazonaws.com/ad60b588835c42a878fbc4ab00aaadec/img/unofficial-javascript-logo-2-1@2x.png"
            className="card-img-top card-animation img-fluid m-2 align-item-center"
            alt="JavaScript Logo"
            style={{ maxWidth: "90px", maxHeight: "90px" }}
          />
        </div>
        <div className="d-flex justify-content-end align-items-center col-3 mt-2">
          <h4 className="text-end blockquote">JS:</h4>
        </div>


        <div className="col-5 pb-3 align-items-center">
          <div className="progress mt-2">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${store.progressGeneral.progress_js}%` }}
              aria-valuenow={store.progressGeneral.progress_js}
              aria-valuemin="0"
              aria-valuemax="100"
            >{store.progressGeneral.progress_js} %</div>
          </div>
        </div>
      </div>

    </div>
  );
};
