import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Profile = () => {
    const [selectedTeacher, setSelectedTeacher] = useState(null);

    const handleTeacherSelect = (teacherName, e) => {
        e.preventDefault(); // Prevenir desplazamiento automático
        setSelectedTeacher(teacherName);
    };

    return (
        <div className="container vh-100 align-items-center">
            <div className="row mb-4">
                <div className="col">
                    <Link to="/modules"><i className="fa-solid fa-arrow-left arrow-back"></i></Link>
                </div>
            </div>
            <div className="row justify-content-center d-flex justify-content-between">
                <div className="col-sm-12 col-md-6 text-start">
                    <div className="embed-responsive embed-responsive-16by9">
                        <h2 className='bigtext text-line text-break'>
                            Hi <span className='text-color-primary'>James</span>! This is your profile
                        </h2>
                    </div>
                </div>
                <div className="col-sm-12 col-md-6 mt-4 align-items-start">
                    <div className='d-flex justify-content-between mb-2'>
                        <p className='my-0 me-4'>First Name:</p>
                        <input type="text" className="form-control" id="firstName" placeholder="" style={{ maxWidth: "60%" }}></input>
                    </div>
                    <div className='d-flex justify-content-between  mb-2'>
                        <p className='my-0 me-4'>Last Name:</p>
                        <input type="text" className="form-control" id="firstName" placeholder="" style={{ maxWidth: "60%" }}></input>
                    </div>
                    <div className='d-flex justify-content-between  mb-2'>
                        <p className='my-0 me-4'>e-mail:</p>
                        <input type="text" className="form-control" id="firstName" placeholder="" style={{ maxWidth: "60%" }}></input>
                    </div>
                    <div className='d-flex justify-content-between  mb-2'>
                        <p className='my-0 '>Teacher:</p>
                        <div className="h-25 px-5  ">
        
                        <div className="btn-group dropdown-center" >
                        <button className="btn btn-secondary dropdown-toggle " type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                            {selectedTeacher ? selectedTeacher : "Select Your Teacher"}
                            
                        </button>
                        <ul className="dropdown-menu dropdown-menu-dark">
                            <li><a className="dropdown-item" href="#" onClick={(e) => handleTeacherSelect("Arnaldo Perez", e)}>Arnaldo Perez</a></li>
                            <li><a className="dropdown-item" href="#" onClick={(e) => handleTeacherSelect("Martin Coimbra", e)}>Martin Coimbra</a></li>
                            <li><a className="dropdown-item" href="#" onClick={(e) => handleTeacherSelect("Nicola Tesla", e)}>Nicola Tesla</a></li>
                            <li><a className="dropdown-item" href="#" onClick={(e) => handleTeacherSelect("Albert Einstein", e)}>Albert Einstein</a></li>
                            <li><a className="dropdown-item" href="#" onClick={(e) => handleTeacherSelect("Isaac Newton", e)}>Isaac Newton</a></li>
                            <li><a className="dropdown-item" href="#" onClick={(e) => handleTeacherSelect("Aristoteles", e)}>Aristoteles</a></li>
                            <li><a className="dropdown-item" href="#" onClick={(e) => handleTeacherSelect("Galileo Galilei", e)}>Galileo Galilei</a></li>
                            <li><a className="dropdown-item" href="#" onClick={(e) => handleTeacherSelect("Marie Curie", e)}>Marie Curie</a></li>
                        </ul>
                    </div>
                    </div>
                    </div>
                    <div className="row  align-items-center mt-4 justify-content-end">
                    <div className=" col-sm-12 col-md-6  text-center">
                        <a href="#" className="btn btn-outline-secondary">Save</a>
                    </div>


                </div>


                </div>

            </div>
            <div className='row h-25 d-flex justify-content-end align-items-center'>
                <div className="col-sm-1 col-md-4  text-sm-end justify-content-between">
                    <div className="d-flex justify-content-between ">
                        <Link to={"/changepassword"}><a href="#" className="btn btn-outline-secondary">Change password</a></Link>
                        <a href="#" className="">I'm Professor</a>
                    </div>
                </div>
            </div>
        </div>
    );
};
