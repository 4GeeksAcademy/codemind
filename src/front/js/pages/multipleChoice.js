
import React, { useEffect, useState, useContext  } from 'react';
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2'

export const MultipleChoice = () => {

  const {store, actions } = useContext(Context);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const {modulo} = useParams();

  useEffect(()=>{
    actions.getSimpleChoice(modulo)
  },[])

  useEffect(()=>{
    actions.getAnswers_SC(modulo)
  },[])

  const respuestaElegida = (text) => {
    setRespuestaSeleccionada(text);
  };
  console.log(respuestaSeleccionada)

  const pregunta_id = store.simpleChoice[preguntaActual]?.id

  const alternativas = store.answers_SC.filter(exercise=>exercise.exercise_id === pregunta_id)

  const avanzarPregunta = () => {
    setPreguntaActual(preguntaActual + 1);
  };
  
  const verificarRespuesta = () => {

    const respuestasCorrectas = store.answers_SC.filter(respCorrecta => respCorrecta.isCorrect === true)
  
    const respuestaCorrecta = respuestasCorrectas.filter(res => res.exercise_id === pregunta_id)

    if (respuestaSeleccionada === respuestaCorrecta[0]?.answers) {
      avanzarPregunta();
    } else {
      alert('Respuesta incorrecta. Inténtalo de nuevo.');
    }
  };

  return (
    <div>
      {store.simpleChoice.length>0 ? <div>
      {preguntaActual < store.simpleChoice.length ? (
      <div>
      <h2>{store.simpleChoice[preguntaActual] && <h2>{preguntaActual+1}.{store.simpleChoice[preguntaActual].question}</h2>}</h2>
      <ul>
      {alternativas.map((alternativa,indice)=><li key={indice} onClick={() => respuestaElegida(alternativa.answers)}
            className={respuestaSeleccionada === indice ? 'seleccionada' : ''}>{alternativa.answers}</li>)}
      </ul>
      <button onClick={verificarRespuesta}>Verificar respuesta</button>
      </div>):(
        <p>¡Felicidades, has completado todas las preguntas!</p>
      )}
      </div>:""}
    </div>
  );
}

