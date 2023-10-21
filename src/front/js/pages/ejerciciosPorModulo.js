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
        'Correct Answer!',
        'Good job! Continues with the next question',
        'success'
      )

    } else {
      Swal.fire(
        'Wrong Answer!',
        'Try it again',
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
          'Excellent!',
          'You have completed all the questions. Continues with the next module',
          'success'
          )
          navigate('/modules')
        }
    }
  
  return (
    <div className="container">
      <div className="row d-flex justify-content-end my-3">
        <div className='col-8 col-md-9 my-3 px-0 d-flex justify-content-between gap-3'>
        <h2 className="fs-2 d-flex align-items-center"> Question N° {theid} of {modulo.toLocaleUpperCase()} </h2>
        </div>
        <div className="col-3 col-md-2 text-center">
        <img className="img-exercise rounded w-100" src={store.module[modulo].imagen} />
        </div>
      </div>
      <div className="row d-flex justify-content-end my-3">
        <div className='col-11 col-md-9 mt-3 ps-0'>
          <h4 className='me-3 fs-5 text-white'>{exercise_actual?.question}</h4>
        </div>
        <div className="col-11 col-md-2 gap-2 px-0 ">
          <h5 className="text-center mb-3 pe-2 text-white">Do you need help?</h5>
          <div className="d-flex justify-content-center gap-4 pe-2">
        <a href={exercise_actual?.info_youtube} target="_blank" type="button" className="rounded-circle btn btn-dark" data-bs-toggle="tooltip" data-bs-placement="top" title="Video access">
          <i className="fab fa-youtube p-0"></i>
        </a>
        <a href={exercise_actual?.info_blog} target="_blank" type="button" className="rounded-circle btn btn-dark" data-bs-toggle="tooltip" data-bs-placement="top" title="Blog access">
          <i className="far fa-file-alt"></i>
        </a>
        </div>
        </div>
      </div>
      {exercise_actual?.type==="FIB" ? 
      <div className="row d-flex justify-content-end">
        <div className='col-11 ps-0 mt-5'>
        <input className="mb-3 form-control bg-dark text-white"
        type="text"
        value={respuesta}
        onChange={e=>handleRespuestaChange(e)}
        placeholder="Type your answer here"
        />
        </div>
      </div>
        :
      <div className="row d-flex justify-content-end">  
      <ul className="col-11 ps-0">
                  {exercise_actual?.answers.map((alternativa, indice) => <p key={indice} onClick={() => setRespuesta(alternativa.answers)}
                    className={`form-control border border-dark rounded py-2 ps-4 fs-5 ${respuesta === alternativa.answers ? "seleccionada":"bg-dark text-white"}`} >{alternativa.answers}</p>)}
                    
                </ul>
                </div>
                }

      <div className="row d-flex justify-content-end mt-3">
        <div className="col-11 mt-4 d-flex justify-content-between ps-0">
        <Link to = {`/preguntas/${modulo}`}> 
          <button className="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="top" title="Back to questionnaire">
           Back 
          </button>
        </Link>
        
        {respuestaCorrecta ? (
           <button className="btn btn-verificar" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Continues with the next question" onClick={avanzarPregunta}>
            Next
          </button>
          ):(<button className="btn btn-verificar" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Check your answer to advance" onClick={verificarRespuesta}>Check</button>)}
        </div>
      </div>
    </div>       
  );
}

