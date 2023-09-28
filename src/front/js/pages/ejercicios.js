import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/index.css";
import {Link} from "react-router-dom";


export const Ejercicios = () => {
  const { store, actions } = useContext(Context);
  
  return (
  <div className="container vh-100 align-items-center text-break">
    <h2 className="my-5 mx-auto text-center">QUESTIONS</h2>
      <div className="row justify-content-center d-flex justify-content-around align-items-center">
        {store.tipoPreguntas.map((item,indice)=>
        <div className="col-sm-12 col-md-4" key = {indice} style={{ width: "20rem" }}>
          <div className="card text-center mb-3">
          <h3 className="card-title text-center text-primary my-3">{item.name}</h3>
            <div className="card-body d-flex justify-content-center align-items-center">
              <img
                src= {item.src}
                className="card-img-top card-animation img-fluid mb-2"
                alt="Card image"
                style={{ maxWidth: "150px", maxHeight: "150px" }}
              />
            </div>
            <div className="card-footer">
            <p>
            <button className="btn btn-secondary btn-lg" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${indice}`} aria-expanded="false" aria-controls={`collapse${indice}`}>
            Description
            </button>
            </p>
            <div className="collapse" id={`collapse${indice}`}>
            <div className="card card-body">
            {item.description}
            </div>
            </div>
            <Link to ={`./${item.siglas}`}>
             <button className="btn btn-primary btn-lg my-3"  type="button">start</button>
            </Link>
            </div>
          </div>
        </div>)}
        </div>
        </div>

  );
};