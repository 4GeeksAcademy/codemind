import React, { useContext, useState, useEffect } from "react";
import logoCM from "../../img/LOGO.png";
import "../../styles/index.css";
import { Login } from './login';
import { RoadMap } from './roadMap';
import { CourseDescrip } from '../component/courseDescrip';
import { useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";

export const Landing = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
  
    const [landingRender, setLandingRender] = useState(null);

    useEffect(() => {
            if (store.token){
                navigate('/modules');
            }
                setLandingRender(landing);
   
    }, [navigate, actions]);

    const landing = (
        <div className='vh.100'>
            <div className='pb-5'>
                <div className='container'>
                    <div className="row mt-4 pt-4 justify-content-between">
                        <div className="col-md-7 col-lg-3 col-xl-7 order-2 order-md-1">
                            <div className="p-4">
                                <h1 className="titulo-landing text-center">
                                    Develop yourself as a top web programmer with CodeMind.
                                </h1>
                            </div>
                            <div className='m-5'>
                                <h4>
                                    <a href="" className="typewrite ms-2" data-period="2000" data-type='[ "Learn the art of coding", "Enjoy the journey of learning", "Write code and discover", "Practice to master coding" ]'>
                                        <span className="wrap ms-3"></span>
                                    </a>
                                </h4>
                            </div>
                        </div>
                        <div className="col-md-4 col-lg-5 col-xl-5 order-1 order-md-2">
                            <Login />
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-dark pt-5'>
                <CourseDescrip />
            </div>


            <div id="roadmap-section" className="p-5">

                <div className="container col-md-8 col-lg-5 col-xl-4">
                    <RoadMap />
                </div>
            </div>
        </div>
    );

    return (
        <>{landingRender}</>
    );
};
