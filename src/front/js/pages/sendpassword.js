import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from "../store/appContext";
export const SendPassword = () => {
const { store, actions} = useContext(Context)
    return (
        <div className="container vh-100 d-flex">
         <div className="mb-5">
          <Link to="/">
            <i className="fa-solid fa-arrow-left arrow-back"></i>
          </Link>
        </div>
        <div className="row justify-content-center d-flex justify-content-around mt-5">
        <div className="col-md-6 text-start">
            <div className="embed-responsive embed-responsive-16by9 mt-5 ">
                <h2 className='bigtext text-center'>
                Check <br></br><span className='text-color-primary text-line'>your<br></br> inbox!</span>
                </h2>
            </div>
        </div>
        <div className="col-md-6 mt-4">
            <div className="text-center mt-5">
                <p>We have sent your password to the email {store.email}, do not lose it again and very importantly, do not share it with anyone!</p>
            </div>

        </div>
    </div>
</div>
    );
};
