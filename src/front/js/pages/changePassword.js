import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const ChangePassword = () => {


    return (
        <div className="container text-start">
            <div className="row">
                <div className="col">
                    <Link to="/profile"><i className="fa-solid fa-arrow-left arrow-back"></i></Link>
                </div>
            </div>
            <div className="row align-items-center">
                <div className="col-4">
                    <h2 className='bigtext text-line'>
                    Change your Secret <span className='text-color-primary'>password </span>
                    </h2>
                </div>
                <div className="col-8 mt-5 align-items-center">
                    <div className="row  d-flex mb-3 align-items-center">
                        <div className="col-4 text-end">
                            <p>New secret Password:</p>
                        </div>
                        <div className="col justify-content-start">
                            <input type="text" className="form-control" id="firstName" placeholder="" style={{ maxWidth: "60%" }}></input>
                        </div>
                    </div>
                    <div className="row mb-3 align-items-center">
                        <div className="col-4 text-end">
                            <p>Confirm secret Password:</p>
                        </div>
                        <div className="col justify-content-start">
                            <input type="text" className="form-control" id="lastName" placeholder="" style={{ maxWidth: "60%" }}></input>
                        </div>
                    </div>
                    <div className="row">
                    <div className="col text-center mt-5 ">
                        <a href="#" className="btn btn-outline-secondary">Change Your Password</a>
                    </div>
                </div>
                </div>

            </div>
        </div>


    );
};
