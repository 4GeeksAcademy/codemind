import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const ChangePassword = () => {
    return (
        <div className="container vh-100 align-items-center ">
            <div className="row mb-4">
                <div className="col">
                    <Link to="/profile"><i className="fa-solid fa-arrow-left arrow-back"></i></Link>
                </div>
            </div>
            <div className="row justify-content-center d-flex justify-content-between ">
                <div className="col-md-6 text-start">
                    <div className="embed-responsive embed-responsive-16by9">
                        <h2 className='bigtext text-line'>
                            Change your Secret <span className='text-color-primary'>password</span>
                        </h2>
                    </div>
                </div>
                <div className="col-md-6 mt-4">
                    <div className="">
                        <p>New secret Password:</p>
                    </div>
                    <div className="">
                        <input type="text" className="form-control" id="firstName" placeholder="" />
                    </div>
                    <div className="row mt-3">
                        <div className="">
                            <p>Confirm secret Password:</p>
                        </div>
                        <div className="mb-4">
                            <input type="text" className="form-control" id="lastName" placeholder="" />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col text-center">
                        <button type="submit" className="btnsignup mt-2 px-3 " style={{ maxWidth: "15em" }}>Change Password</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
