import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const SendPassword = () => {

    return (
        <div className="container vh-100 d-flex align-items-center ">
        <div className="row justify-content-center d-flex justify-content-around align-items-center">
            <div className='mb-5'>
        <Link to="/"><i className="fa-solid fa-arrow-left arrow-back"></i></Link>
        </div>
        <div className="col-md-6 text-start">
            <div className="embed-responsive embed-responsive-16by9">
                <h2 className='bigtext  text-break'>
                Check <br></br><span className='text-color-primary text-line'>your<br></br> inbox!</span>
                </h2>
            </div>
        </div>
        <div className="col-md-6 mt-4">
            <div className="text-center ">
                <p>We have sent your password to the email "boomail@mail.com", do not lose it again and very importantly, do not share it with anyone!</p>
            </div>

        </div>
    </div>
</div>
    );
};
