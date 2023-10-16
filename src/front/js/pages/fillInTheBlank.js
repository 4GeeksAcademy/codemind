import React, { useEffect, useState, useContext  } from 'react';
import { Context } from "../store/appContext";
import { useParams ,useNavigate} from "react-router-dom";
import Swal from 'sweetalert2'
import {Link} from "react-router-dom";

export const PreguntaCompletar = () => {

  const {modulo,theid} = useParams();
  const { store, actions } = useContext(Context);
  const [respuesta, setRespuesta] = useState('');
  const [respuestaCorrecta, setRespuestaCorrecta] = useState(false);
  const exercise_actual = store.exercises.find((exercise,indice)=>(indice+1)=== parseInt(theid))
  const navigate = useNavigate()
  
  useEffect(()=>{
    actions.getExercises(modulo)
  },[])

  useEffect(()=>{
    actions.getLastAnswerModule(modulo)
  },[])
  const handleRespuestaChange = (event) => {
    // e.preventDefault()
    setRespuesta(event.target.value);
    setRespuestaCorrecta(false); // Reinicia la respuesta correcta al cambiar la respuesta
  };
  
  const verificarRespuesta = async (e) => {
    e.preventDefault()
    
    let verificacion = await actions.getVerificar(exercise_actual?.id,respuesta)
    
    if (verificacion) {
      setRespuestaCorrecta(true);
      Swal.fire(
        'Respuesta Correcta!',
        'Buen trabajo! Continua con la siguiente pregunta',
        'success'
      )

    } else {
      Swal.fire(
        'Respuesta Incorrecta!',
        'Intenta otra vez',
        'error'
      )
    }
  };

  const avanzarPregunta = () => {
    
      if (respuestaCorrecta && theid < store.exercises.length) {
        setRespuesta('');
        setRespuestaCorrecta(false); // Reinicia la respuesta correcta
        actions.UpdateLastAnswer(exercise_actual);
        navigate( `/preguntas/${modulo}/${parseInt(theid) + 1}`)
      } else {
        Swal.fire(
          'Excelente!',
          'Has completado todas las preguntas. Continua con el siguiente módulo',
          'success'
          )
          navigate('/modules')
        }
    }
  
  return (
    <div className="container">
      <div className="row d-flex justify-content-end my-3">
        <div className='col-8 my-3 px-0 d-flex justify-content-between gap-3'>
        <h2 className="fs-2 d-flex align-items-center">Pregunta N° {theid} de {modulo.toLocaleUpperCase()} </h2>
        </div>
        <div className="col-2 text-center">
        <img className="img-exercise rounded" src={store.module[modulo].imagen} />
        </div>
      </div>
      <div className="row d-flex justify-content-end my-3">
        <div className='col-8 mt-3 ps-0 pt-3'>
          <h4 className='me-3 fs-5 text-white'>{exercise_actual?.question}</h4>
        </div>
        <div className="col-2 gap-2 px-0 ">
          <h5 className="text-center mb-3 pe-2 text-white">¿Necesitas ayuda?</h5>
          <div className="d-flex justify-content-center gap-4 pe-2">
        <a href={exercise_actual?.info_youtube} target="_blank" type="button" className="rounded-circle btn btn-dark" data-bs-toggle="tooltip" data-bs-placement="top" title="Acceso a video respecto al tema">
          <i className="fab fa-youtube p-0"></i>
        </a>
        <a href={exercise_actual?.info_blog} target="_blank" type="button" className="rounded-circle btn btn-dark" data-bs-toggle="tooltip" data-bs-placement="top" title="Acceso a blog respecto al tema">
          <i className="far fa-file-alt"></i>
        </a>
        </div>
        </div>
      </div>
      {exercise_actual?.type==="FIB" ? 
      <div className="row d-flex justify-content-end">
        <div className='col-10 ps-0'>
        <input className="mb-3 form-control bg-dark text-white"
        type="text"
        value={respuesta}
        onChange={e=>handleRespuestaChange(e)}
        placeholder="Escribe tu respuesta aquí"
        />
        </div>
      </div>
        :
      <div className="row d-flex justify-content-end">  
      <ul className="col-10 ps-0">
                  {exercise_actual?.answers.map((alternativa, indice) => <p key={indice} onClick={() => setRespuesta(alternativa.answers)}
                    className={`form-control border border-dark rounded py-2 ps-4 fs-5 ${respuesta === alternativa.answers ? "seleccionada":"bg-dark text-white"}`} >{alternativa.answers}</p>)}
                    
                </ul>
                </div>
                }

      <div className="row d-flex justify-content-end mt-3">
        <div className="col-10 mt-4 d-flex justify-content-between ps-0">
        <Link to = {`/preguntas/${modulo}`}> 
          <button className="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="top" title="Volver a Cuestionario">
          Volver <i className="fas fa-undo"></i>
          </button>
        </Link>
        
        {respuestaCorrecta ? (
           <button className="btn btn-verificar" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Continua con la siguiente pregunta" onClick={avanzarPregunta}>
            Siguiente
          </button>
          ):(<button className="btn btn-verificar" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Verifica tu respuesta para avanzar" onClick={verificarRespuesta}>Verificar</button>)}
        </div>
      </div>
    </div>       
  );
}

