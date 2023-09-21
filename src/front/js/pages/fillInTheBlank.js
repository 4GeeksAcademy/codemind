
import React, { useEffect, useState, useContext  } from 'react';
import { Context } from "../store/appContext";
import Swal from 'sweetalert2'

export const PreguntaCompletar = () => {

  
  const { store, actions } = useContext(Context);
  console.log(store.fib[0]?.id)
  useEffect(()=>{
    actions.getFib()
  },[])

  useEffect(()=>{
    actions.getAnswers_fib()
  },[])

  const [indicePregunta, setIndicePregunta] = useState(0);
  const [respuesta, setRespuesta] = useState('');
  const [respuestaCorrecta, setRespuestaCorrecta] = useState(false);

  // const preguntaActual = store.fib[indicePregunta]?.question;
  const answerActual = store.answers_fib[indicePregunta]?.answers;
  
//  const xd=()=>{
//   Swal.fire(
//   'Good job!',
//   'You clicked the button!',
//   'success'
// // )
//  }
  const handleRespuestaChange = (event) => {
    setRespuesta(event.target.value);
    setRespuestaCorrecta(false); // Reinicia la respuesta correcta al cambiar la respuesta
  };

  const verificarRespuesta = () => {
    if (respuesta.toLowerCase() === answerActual.toLowerCase()) {
      setRespuestaCorrecta(true);
      Swal.fire(
        'Buen trabajo!',
        'Continua con la siguiente pregunta',
        'success'
      )
    } else {
      Swal.fire(
        'Respuesta Incorrecta!',
        'Sigue intentando',
        'error'
      )
    }
  };

  const avanzarPregunta = () => {
    // Avanzar a la siguiente pregunta solo si la respuesta es correcta
    if (respuestaCorrecta) {
      if (indicePregunta < store.fib.length - 1) {
        setIndicePregunta(indicePregunta + 1);
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
        'error'
      )
    }
  };

  return (
    <div className="App">
      <h2>{answerActual}</h2>
      {/* <h2>{preguntaActual}</h2> */}
      {store.fib[indicePregunta] && <h2>{indicePregunta+1}.{store.fib[indicePregunta].question}</h2>}
      <input
        type="text"
        value={respuesta}
        onChange={handleRespuestaChange}
        placeholder="Escribe tu respuesta aquí"
      />
       <button onClick={verificarRespuesta}>Verificar</button>
      <button onClick={avanzarPregunta}>Siguiente</button>
    </div>
  );
}


