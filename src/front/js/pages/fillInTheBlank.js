
import React, { useEffect, useState, useContext  } from 'react';
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2'

export const PreguntaCompletar = () => {

  const {modulo} = useParams();
  const { store, actions } = useContext(Context);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuesta, setRespuesta] = useState('');
  const [respuestaCorrecta, setRespuestaCorrecta] = useState(false);
  
  useEffect(()=>{
    actions.getFib(modulo)
  },[])

  
  const handleRespuestaChange = (event) => {
    // e.preventDefault()
    setRespuesta(event.target.value);
    setRespuestaCorrecta(false); // Reinicia la respuesta correcta al cambiar la respuesta
  };

  const verificarRespuesta = async (e) => {
    e.preventDefault()
    let verificacion = await actions.getVerificar(store.fib[preguntaActual].id)

    if (verificacion === respuesta.toLowerCase()) {
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
    // Avanzar a la siguiente pregunta solo si la respuesta es correcta
    if (respuestaCorrecta) {
      if (preguntaActual < store.fib.length - 1) {
        setPreguntaActual(preguntaActual + 1);
        setRespuesta('');
        setRespuestaCorrecta(false); // Reinicia la respuesta correcta
      } else {
        Swal.fire(
          'Excelente!',
          'Has completado todas las preguntas.',
          'success'
        )
      }
    } else {
      Swal.fire(
        'Alto ahí!',
        'Debes responder correctamente antes de avanzar.',
        'warning'
      )
    }
  };
  const progresoActual = () => {
    const progreso=(preguntaActual+1)/(store.fib?.length)*100
    return progreso
    };


  return (
    <div className="row d-flex justify-content-end">
      <div className='col-lg-10 col-sm-10 '>
    <div className="container-fluid mt-5">
      <div className="mb-3 text-danger fs-1">
      Curso de {modulo.toLocaleUpperCase()}
      </div>
      <div className="progress mb-3">
      <div className="progress-bar" role="progressbar" style={{width: `${progresoActual()}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progresoActual()}%</div>
      </div>
      {store.fib[preguntaActual] && <div className="d-flex">
        <p className='fs-2 text-white'>{preguntaActual+1}.{store.fib[preguntaActual].question}</p>
        <div className="d-grid gap-5">
        <button type="button" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top">
        Tooltip on top
        </button>
        <button type="button" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top">
        Tooltip on top
        </button>
         </div> 
        </div>}
      <form onSubmit={verificarRespuesta}>
        <input className="mb-3 form-control"
        type="text"
        value={respuesta}
        onChange={e=>handleRespuestaChange(e)}
        placeholder="Escribe tu respuesta aquí"
      />
      </form>
       <div className="mt-4 d-flex justify-content-end" >
        <button className="btn btn-primary" onClick={avanzarPregunta}>Siguiente</button>
      </div>
    </div>
    </div>
    </div>
  );
}


