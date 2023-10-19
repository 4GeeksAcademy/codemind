import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const AboutUs = () => {


    return (
        <div className="container vh-100 m-5">
            <div>
                <h2 className='text-line'>
                    Welcome!</h2>
                <p> To CodeMind! We are a dedicated team working to provide an innovative learning platform that empowers individuals to become proficient in full-stack development and programming. Our platform is designed to cater to both aspiring students and experienced professionals, offering a comprehensive range of resources and tools to enhance your coding journey.</p>
            </div>
            <div>
                <h2 className='text-line'>
                    Our <span className='text-color-primary'>vision</span>
                </h2>
                <p> Is  to foster a community of passionate learners and educators, where knowledge is accessible to all. We believe in the transformative power of coding and its ability to shape the future. With this in mind, we strive to create a platform that encourages creativity, critical thinking, and collaboration among individuals from diverse backgrounds.</p>
            </div>
            <div>
                <h2 className='text-line'>
                    Join <span className='text-color-primary'>Us!</span>
                </h2>
                <p> Whether you're just starting your coding journey or looking to refine your skills, CodeMind is here to guide and support you. Join our community today and embark on an exciting path of exploration, creativity, and growth. Together, we're shaping the future of coding education.</p>
            </div>
            <div>
                <h2 className='text-line'>
                    You are <span className='text-color-primary'>teacher?</span>
                </h2>
                <p>To be part of our great teachers you have to complete <span className='text-color-primary'>this form</span>, remember to have your academic documents at hand</p>
            </div>
        </div>
    );
};
