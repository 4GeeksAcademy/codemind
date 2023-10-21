import React, { useState,useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/index.css";
import { Link,useParams } from "react-router-dom";
import {PreguntaCompletar} from "./ejerciciosPorModulo.js"


export const Ejercicios = () => {
  const {modulo} = useParams();
  const { store, actions } = useContext(Context);
  const last_answer= store.exercises.findIndex((exercise)=>exercise.id=== store.last_answer.exercise_id)+2

  useEffect(()=>{
    actions.getExercises(modulo)
    actions.getProgresoModulo(modulo)
    actions.getLastAnswerModule(modulo)
    actions.getRespuestaUser()
    actions.getProgresoGeneral()
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
      <div className='col-10'>
      <h2 className="mb-3 text-center fs-1 mt-4">
      {modulo.toLocaleUpperCase()} Questionnaire
      </h2>
      </div>
      </div>
      <div className="row d-flex justify-content-end">
      <div className='col-12 col-md-7'>
      <h4 className="mb-3" style={{color: `${store.module[modulo].color}`}}>
      Progress
      </h4>
      <div className="progress mb-3">
      <div className="progress-bar" role="progressbar" style={{width: `${progresoActual()}%`, backgroundColor: `${store.module[modulo].color}`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progresoActual()}%</div>
      </div>
     {store.exercises.map((exercise, indice) =>
      <Link key={indice} to={ respuestaCorrectaIncluida(exercise.id) ? `./${indice+1}` : `#`}>
          <div  className="form-control border border-dark mb-3 d-flex justify-content-between bg-dark text-white py-1">
        <span>{indice+1} - {exercise.question}</span>
        {respuestaCorrectaIncluida(exercise.id) && (<span className="d-flex align-items-center"><i className="fas fa-check-circle" style={{color: `${store.module[modulo].color}`}}></i></span>)}
      </div>
      </Link>
      )}
      <div className="d-flex justify-content-between mt-4 gap-2">
      <Link to="/modules" >
        <button className="btn btn-secondary ">Back to modules</button>
      </Link>
      <Link to={ last_answer < store.exercises.length ? `./${last_answer}` : `./${store.exercises.length}`}>
        <button className="btn text-white" style={{backgroundColor: `${store.module[modulo].color}`}}>Continue</button>
      </Link>
      </div>
      
    </div>
    <div className='col-12 col-md-3 d-flex align-items-center'>
      <img className="rounded w-100 h-50" src={store.module[modulo].imagen} />
      </div>
    </div>
    </div>

  );
};