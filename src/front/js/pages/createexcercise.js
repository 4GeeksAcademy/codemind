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
        <div className="container vh-100 align-items-center">
            <div className="row mb-4">
                <div className="col">
                    <Link to="/modules"><i className="fa-solid fa-arrow-left arrow-back"></i></Link>
                </div>
            </div>
            <div className="row justify-content-center d-flex justify-content-between ">
                <div className="col-md-6 text-start">
                    <div className="embed-responsive embed-responsive-16by9">
                        <h2 className='bigtext text-line'>
                            Create <span className='text-color-primary'>Excercise</span>
                        </h2>
                    </div>
                </div>
                <div className="col-md-6 mt-4 align-items-start">
                    <div className="h-25 ">
                        <p>Module:</p>
                        <div className="btn-group dropend ">
                        <button className="btn btn-secondary dropdown-toggle " type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ zIndex: 1 }} >
                            {selectedModule ? selectedModule : "Select Module"}
                            
                        </button>
                        <ul className="dropdown-menu dropdown-menu-dark">
                            <li><a className="dropdown-item" href="#" onClick={(e) => handleModuleSelect("HTML", e)}>HTML</a></li>
                            <li><a className="dropdown-item" href="#" onClick={(e) => handleModuleSelect("CSS", e)}>CSS</a></li>
                            <li><a className="dropdown-item" href="#" onClick={(e) => handleModuleSelect("JavaScript", e)}>JavaScript</a></li>
                            <li><a className="dropdown-item" href="#" onClick={(e) => handleModuleSelect("React", e)}>React</a></li>
                            <li><a className="dropdown-item" href="#" onClick={(e) => handleModuleSelect("Python", e)}>Python</a></li>
                            <li><a className="dropdown-item" href="#" onClick={(e) => handleModuleSelect("Flask", e)}>Flask</a></li>
                            <li><a className="dropdown-item" href="#" onClick={(e) => handleModuleSelect("SQL Alchemy", e)}>SQL Alchemy</a></li>
                            <li><a className="dropdown-item" href="#" onClick={(e) => handleModuleSelect("JWT", e)}>JWT</a></li>
                        </ul>
                    </div>
                    </div>

                    <div className="row mt-3">
                        <div className="">
                            <p>Excercise Type:</p>
                        </div>
                        <div className="col justify-content-start">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                                <label className="form-check-label text-light" htmlFor="inlineRadio1">Fill in the Blank</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                <label className="form-check-label text-light" htmlFor="inlineRadio2">Select Option</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" />
                                <label className="form-check-label text-light" htmlFor="inlineRadio3">Drag and Drop</label>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="">
                            <p>Question:</p>
                        </div>
                        <div className="col justify-content-start">
                            <input type="text" className="form-control" id="pregunta" placeholder=""></input>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="">
                            <p>Answer:</p>
                        </div>
                        <div className="col justify-content-start">
                            <input type="text" className="form-control" id="answer" placeholder=""></input>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col text-center">
                            <a href="#" className="btn btn-outline-secondary">Create</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
