import React from "react";
import "../../styles/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCode, faPaintBrush, faLaptopCode } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const Progress = () => {
  return (
    <div className="container vh-100">
      <div className="d-flex justify-content-center text-center pt-5 pb-5">
        <h2>This is your progress, keep going little grasshopper</h2>
      </div>
      <div className="row pt-5 pb-5">
        <div className="offset-1 col-3">
          <h3 className="text-center">Global progress:</h3>
        </div>
        <div className="col-8">
          <div className="progress mt-2">
            <div className="progress-bar" role="progressbar" style={{ width: "15%" }} aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
            <div className="progress-bar bg-success" role="progressbar" style={{ width: "30%" }} aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
            <div className="progress-bar bg-info" role="progressbar" style={{ width: "20%" }} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
      </div>
      <div className="row pb-2">
        <div className="d-flex justify-content-start offset-2 col-3">
          <h4 className="text-center">HTML:</h4>
        </div>
        <div className="col-6">
          <div className="progress mt-2">
            <div className="progress-bar" role="progressbar" aria-valuenow={0} aria-valuemin={0} aria-valuemax={100}></div>
          </div>
        </div>
      </div>
      <div className="row pb-2">
        <div className="d-flex justify-content-start offset-2 col-3">
          <h4 className="text-center">HTML:</h4>
        </div>
        <div className="col-6">
          <div className="progress mt-2">
            <div className="progress-bar" role="progressbar" aria-valuenow={0} aria-valuemin={0} aria-valuemax={100}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

