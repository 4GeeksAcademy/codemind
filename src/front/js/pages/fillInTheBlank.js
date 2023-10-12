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
    actions.getLastAnswerModule(store.user.id,modulo)
  },[])
  console.log(store.last_answer.id)


  const handleRespuestaChange = (event) => {
    // e.preventDefault()
    setRespuesta(event.target.value);
    setRespuestaCorrecta(false); // Reinicia la respuesta correcta al cambiar la respuesta
  };
  console.log(exercise_actual?.id)
  
  console.log(respuesta)
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
          'Has completado todas las preguntas.',
          'success'
          )
          navigate('/modules')
        }
    }
  
  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-end">
       <div className='col-lg-10 col-sm-10 '>
        <div className='fs-2 text-white me-3'>{theid} - {exercise_actual?.question}</div>
        <div className="d-flex align-items-center gap-2">
        <a href={exercise_actual?.info_youtube} target="_blank" type="button" className="rounded-circle btn btn-success" data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top">
        <i className="fab fa-youtube p-0"></i>
        </a>
        <a href={exercise_actual?.info_blog} target="_blank" type="button" className="rounded-circle btn btn-success" data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top">
        <i className="far fa-file-alt"></i>
        </a>
        </div>
        {exercise_actual?.type==="FIB" ? 
        <input className="mb-3 form-control"
        type="text"
        value={respuesta}
        onChange={e=>handleRespuestaChange(e)}
        placeholder="Escribe tu respuesta aquí"
        />
        :<ul className="ps-0">
                  {exercise_actual?.answers.map((alternativa, indice) => <p key={indice} onClick={() => setRespuesta(alternativa.answers)}
                    className={`card-body rounded p-0 ps-4 fs-4 ${respuesta === alternativa.answers ? "seleccionada":"bg-white text-dark"}`} >{alternativa.answers}</p>)}
                    
                </ul>
                }
        
        <div className="mt-4 d-flex justify-content-between">
        <Link to = {`/preguntas/${modulo}`}> 
        <button className="btn btn-primary">Regresar a</button>
        </Link>
        <button className="btn btn-success" onClick={verificarRespuesta}>Verificar</button>
        <div>
          {respuestaCorrecta && (
           <button className="btn btn-primary" onClick={avanzarPregunta}>
            Siguiente
          </button>
          )}
        </div>
        </div>
       </div>
      </div>
    </div>
        
  );
}



