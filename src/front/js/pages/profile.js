import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Profile = () => {
    const [selectedTeacher, setSelectedTeacher] = useState(null);

    const handleTeacherSelect = (teacherName, e) => {
        e.preventDefault(); // Prevenir desplazamiento automático
        setSelectedTeacher(teacherName);
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
                    <h2 className='bigtext text-line'>
                        Hi <span className='text-color-primary'>James</span>! This is your profile
                    </h2>
                </div>
                <div className="col-8 mt-5 align-items-center">
                    <div className="row  d-flex mb-3 align-items-center">
                        <div className="col-4 text-end">
                            <p>First Name</p>
                        </div>
                        <div className="col justify-content-start">
                            <input type="text" className="form-control" id="firstName" placeholder="" style={{ maxWidth: "60%" }}></input>
                        </div>
                    </div>
                    <div className="row mb-3 align-items-center">
                        <div className="col-4 text-end">
                            <p>Last Name</p>
                        </div>
                        <div className="col justify-content-start">
                            <input type="text" className="form-control" id="lastName" placeholder="" style={{ maxWidth: "60%" }}></input>
                        </div>
                    </div>
                    <div className="row mb-3 align-items-center">
                        <div className="col-4 text-end">
                            <p>Email</p>
                        </div>
                        <div className="col justify-content-start">
                            <input type="text" className="form-control" id="email" placeholder=""></input>
                        </div>
                    </div>
                    <div className="row mb-3 align-items-center">
                        <div className="col-4 text-end">
                            <p>Teacher</p>
                        </div>
                        <div className="col justify-content-start">
                            <div className="btn-group dropend">
                                <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {selectedTeacher ? selectedTeacher : "Select Your Teacher"}
                                </button>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#" onClick={(e) => handleTeacherSelect("Arnaldo Perez", e)}>Arnaldo Perez</a></li>
                                    <li><a className="dropdown-item" href="#" onClick={(e) => handleTeacherSelect("Martin Coimbra", e)}>Martin Coimbra</a></li>
                                    <li><a className="dropdown-item" href="#" onClick={(e) => handleTeacherSelect("Severus Snape", e)}>Severus Snape</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col text-center mb-2 ">
                        <a href="#" className={`btn btn-outline-secondary me-2 ${!selectedTeacher ? 'disabled' : ''}`}>save changes</a>
                        <Link to={"/changepassword"}><a href="#" className="btn btn-outline-secondary">Change Your Password</a></Link>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col text-end mb-2">
                    <p>I’m Professor</p>
                </div>
            </div>
        </div>
    );
};
