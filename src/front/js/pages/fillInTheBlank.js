
import React, { useEffect, useState, useContext  } from 'react';
import { Context } from "../store/appContext";


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
  

  const handleRespuestaChange = (event) => {
    setRespuesta(event.target.value);
    setRespuestaCorrecta(false); // Reinicia la respuesta correcta al cambiar la respuesta
  };

  const verificarRespuesta = () => {
    if (respuesta.toLowerCase() === answerActual.toLowerCase()) {
      setRespuestaCorrecta(true);
    } else {
      alert('Respuesta incorrecta. Inténtalo de nuevo.');
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
        alert('Has completado todas las preguntas.');
      }
    } else {
      alert('Debes responder correctamente antes de avanzar.');
    }
  };

  return (
    <div className="App">
      <h2>{answerActual}</h2>
      {/* <h2>{preguntaActual}</h2> */}
      {store.fib[indicePregunta] && <h2>{store.fib[indicePregunta].id}.{store.fib[indicePregunta].question}</h2>}
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


