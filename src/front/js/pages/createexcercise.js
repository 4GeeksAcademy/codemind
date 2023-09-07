import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoCM from "../../img/LOGO.png";

export const CreateExcercise = () => {

    const [selectedModule, setSelectedModule] = useState(null);

    const handleModuleSelect = (moduleName, e) => {
        e.preventDefault(); // Prevenir desplazamiento automático
        setSelectedModule(moduleName);
    };


    return (
        <div className="container text-start">
            <div className="row">
                <div className="col">
                    <Link to="/modules"><i className="fa-solid fa-arrow-left arrow-back"></i></Link>
                </div>
            </div>
            <div className="row align-items-center">
                <div className="col-4">
                    <div className="img-index">
                        <img src={logoCM} alt="Logo" className="img-fluid" />
                    </div>
                </div>
                <div className="col-8 mt-5 align-items-center">
                    <div className="row mb-3">
                        <div className="col-12 text-center mb-4">
                            <h2 className='bigtext'>Create <span className='text-line'>Exercise</span></h2>
                        </div>
                    </div>
                    <div className="row mb-4 align-items-center">
                        <div className="col-4 text-end">
                            <p>Module:</p>
                        </div>
                        <div className="col justify-content-start mb-4">
                            <div className="btn-group dropend">
                                <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {selectedModule ? selectedModule : "Select Module"}
                                </button>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#" onClick={(e) => handleModuleSelect("HTML", e)}>HTML</a></li>
                                    <li><a className="dropdown-item" href="#" onClick={(e) => handleModuleSelect("CSS", e)}>CSS</a></li>
                                    <li><a className="dropdown-item" href="#" onClick={(e) => handleModuleSelect("JavaScript", e)}>JavaScript</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3 align-items-center">
                        <div className="col-4 text-end">
                            <p>Exercise Type</p>
                        </div>
                        <div className="col justify-content-start">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                                <label className="form-check-label" htmlFor="inlineRadio1">Fill in the Blank</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                <label className="form-check-label" htmlFor="inlineRadio2">Select Option</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" />
                                <label className="form-check-label" htmlFor="inlineRadio3">Drag and Drop</label>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3 align-items-center">
                        <div className="col-4 text-end">
                            <p>Question:</p>
                        </div>
                        <div className="col justify-content-start">
                            <input type="text" className="form-control" id="pregunta" placeholder=""></input>
                        </div>
                    </div>
                    <div className="row mb-3 align-items-center">
                        <div className="col-4 text-end">
                            <p>Answer:</p>
                        </div>
                        <div className="col justify-content-start">
                            <input type="text" className="form-control" id="respuesta" placeholder=""></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col text-center mb-2">
                            <a href="#" className="btn btn-outline-secondary me-2">Save Changes</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
