import React, { useState,useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/index.css";
import { Link,useParams } from "react-router-dom";
import {PreguntaCompletar} from "./fillInTheBlank.js"


export const Ejercicios = () => {
  const {modulo} = useParams();
  const { store, actions } = useContext(Context);
  const last_answer= store.exercises.findIndex((exercise)=>exercise.id=== store.last_answer.exercise_id)+2

  useEffect(()=>{
    actions.getExercises(modulo)
  },[])
  
  useEffect(()=>{
    actions.getProgresoModulo(modulo)
  },[])

  useEffect(()=>{
    actions.getLastAnswerModule(modulo)
  },[])

  useEffect(()=>{
    actions.getRespuestaUser()
  },[])
  

  const respuestaCorrectaIncluida = (exercise_id) => {
    const respuesta = store.respuestaUser.includes(exercise_id)
    return respuesta
    };
 
  const progresoActual = () => {
    const progreso = store.progressModule
    return progreso
    };

  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-end">
      <div className='col-lg-10 col-sm-10 '>
      <h2 className="mb-3 text-center fs-1 mt-4">
      Cuestionario de {modulo.toLocaleUpperCase()}
      </h2>
      <img src={store.imageModule[modulo]} />
      <h3 className="mb-3">
      Progreso
      </h3>
      <div className="progress mb-3">
      <div className="progress-bar bg-secondary" role="progressbar" style={{width: `${progresoActual()}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progresoActual()}%</div>
      </div>
    {store.exercises.map((exercise, indice) =>
      <Link to={ respuestaCorrectaIncluida(exercise.id) ? `./${indice+1}` : `#`}>
          <div key={indice} className="form-control border border-dark mb-3 d-flex justify-content-between bg-dark text-white py-2">
        <span>{indice+1} - {exercise.question}</span>
        {respuestaCorrectaIncluida(exercise.id) && (<span className="align-items-center"><i className="fas fa-check-circle" style={{color: `#F2811D`}}></i></span>)}
      </div>
      </Link>
      )}
      <div className="d-flex justify-content-between">
      <Link to="/modules" >
        <button className="btn btn-secondary mt-5">Regresar a módulos</button>
      </Link>
      <Link to={ last_answer < store.exercises.length ? `./${last_answer}` : `./${store.exercises.length}`}>
        <button className="btn btn-verificar mt-5">Continuar</button>
      </Link>
      </div>
    </div>
    </div>
    </div>

  );
};