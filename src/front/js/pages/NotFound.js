import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const NotFound = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
                <h1 className="bigtext text-line">404</h1>
                <button className="btn btn-info text-black">
                    <Link to={"/"} style={{ textDecoration: 'none', color: 'black' }}>Go to Home <i className="fa-solid fa-house"></i></Link>
                </button>
            </div>
        </div>
	);
};
