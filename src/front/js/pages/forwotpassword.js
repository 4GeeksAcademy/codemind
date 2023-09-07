import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const ForwotPassword = () => {

    return (
        <div className="container text-start">
            <div className="row">
                <div className="col">
                    <Link to="/index"><i className="fa-solid fa-arrow-left arrow-back"></i></Link>
                </div>
            </div>
            <div className="row align-items-center">
                <div className="col-4">
                    <h2 className='bigtext text-line'>
                        Forwot your secret <span className='text-color-primary'>password</span>?
                    </h2>
                </div>
                <div className="col-8">
                    <div className="row mb-3 text-center">
                        <div className="col">
                            <p className='fs-5'>
                                Enter your email and we will send you an email to reset your password.
                            </p>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-12" style={{ maxWidth: "80%" }}>
                            <input type="text" className="form-control" id="lastName" placeholder=""></input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
