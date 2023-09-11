import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const ForwotPassword = () => {

    return (           
        <>
        <div className="container vh-100 d-flex align-items-center ">
            <div className="row justify-content-center d-flex justify-content-around align-items-center">
                <div className='mb-5'>
            <Link to="/"><i className="fa-solid fa-arrow-left arrow-back"></i></Link>
            </div>
                <div className="col-md-5 text-start">
                
                    <div className="embed-responsive embed-responsive-16by9">
                        <h2 className='bigtext text-line text-break'>
                            Forgot your secret <span className='text-color-primary'>password</span>?
                        </h2>
                    </div>
                </div>
                <div className="col-md-6 mt-4">
                    <div className="text-center">
                        <p>Enter your email, and we will send you an email to reset your password.</p>
                    </div>
                    <div className="">
                        <input type="text" className="form-control" id="firstName" placeholder="" />
                    </div>
                    <div className="row mt-4">
                        <div className="col text-center">
                            <Link to="/sendpassword">
                                <a href="#" className="btn btn-outline-secondary">Send password</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};
