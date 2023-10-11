import React, { useState,useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/index.css";
import { Link,useParams } from "react-router-dom";
import {PreguntaCompletar} from "./fillInTheBlank.js"
// import {SimpleChoice} from "./simpleChoice.js"


export const Ejercicios = () => {
  const {modulo} = useParams();
  const { store, actions } = useContext(Context);
  useEffect(()=>{
    actions.getExercises(modulo)
  },[])
  
  useEffect(()=>{
    actions.getProgresoModulo(store.user.id,modulo)
  },[])

  // const progress = actions.getProgreso(store.user.id)
  // console.log(progress)
  const progresoActual = () => {
    const progreso = store.progressModule
    return progreso
    };

  return (
    <div className="container">
      <div className="row d-flex justify-content-end">
      <div className='col-lg-10 col-sm-10 '>
      <div className="mb-3 text-danger text-center fs-1">
      Curso de {modulo.toLocaleUpperCase()}
      </div>
      <div className="mb-3 text-danger fs-2">
      Preguntas
      </div>
      <div className="progress mb-3">
      <div className="progress-bar" role="progressbar" style={{width: `${progresoActual()}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progresoActual()}%</div>
      </div>
    {store.exercises.map((exercise, indice) =>
        // <Link to = {`./${indice+1}`}>
          <div key={indice} className="form-control my-2 d-flex justify-content-between">
        <span>{indice+1} - {exercise.question}</span>
        <span><i class="fas fa-check-circle" style={{color: `#1f5122`}}></i></span>
      </div>
      // </Link>
      )}
      <div className="d-flex justify-content-between">
      <Link to="/modules" >
        <button className="btn btn-primary mt-5">Regresar a módulos</button>
      </Link>
      <Link to="./1" >
        <button className="btn btn-primary mt-5">Continuar</button>
      </Link>
      </div>
      
    {/* <PreguntaCompletar/> */}
    {/* <SimpleChoice/> */}
    </div>
    </div>
    </div>

  );
};