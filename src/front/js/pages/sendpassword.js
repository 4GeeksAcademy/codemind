import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from "../store/appContext";
export const SendPassword = () => {
const { store, actions} = useContext(Context)
    return (
        <div className="container  d-flex flex-column justify-content-center">
        <div className="mb-5">
            <Link to="/">
                <i className="fa-solid fa-arrow-left arrow-back"></i>
            </Link>
        </div>
        <div className="row justify-content-center">
            <div className="col-md-6 text-center mb-5">
                <h2 className='bigtext text-center mb-5'>
                    Check
                    <br />
                    <span className='text-color-primary text-line'>
                        your
                        <br />
                        inbox!
                    </span>
                </h2>
            </div>
            <div className="col-md-6 text-center  d-flex  align-items-center ">
                <p>
                    We have sent your password to the email {store.email}, do not lose it again and very importantly, do not share it with anyone!
                </p>
            </div>
        </div>
    </div>
);
};