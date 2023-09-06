import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const SendPassword = () => {

    return (
        <div className="container text-start">
            <div className="row">
                <div className="col">
                    <Link to="/profile"><i className="fa-solid fa-arrow-left arrow-back"></i></Link>
                </div>
            </div>
            <div className="row align-items-center">
                <div className="col-4">
                    <h2 className='bigtext text-color-primary'>
                        Check <span className='text-line'>your inbox!</span>
                    </h2>
                </div>
                <div className="col-8 mt-5">
                    <div className="row mb-3">
                        <div className="col">
                            <p className='fs-4 text-center'>
                                We have sent your password to the email "boomail@mail.com", do not lose it again and very importantly, do not share it with anyone!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
