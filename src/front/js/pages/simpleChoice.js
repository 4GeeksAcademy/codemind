
import React, { useEffect, useState, useContext } from 'react';
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2'

export const SimpleChoice = () => {

  const { store, actions } = useContext(Context);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const { modulo } = useParams();

  useEffect(() => {
    actions.getSimpleChoice(modulo)
  }, [])

  const respuestaElegida = (text) => {
    setRespuestaSeleccionada(text);
  };

  const avanzarPregunta = () => {
    setPreguntaActual(preguntaActual + 1);
  };

  const verificarRespuesta = async () => {

    let verificacion = await actions.getVerificar(respuestaSeleccionada.exercise_id,respuestaSeleccionada.answers)
    console.log(respuestaSeleccionada.exercise_id)

    if (verificacion) {
      Swal.fire(
        'Respuesta Correcta!',
        'Buen trabajo',
        'success'
      )
      avanzarPregunta();

    } else {
      Swal.fire(
        'Respuesta Incorrecta!',
        'Intenta otra vez',
        'error'
      )
    }
  };

  const progresoActual = () => {
    let progreso = (preguntaActual + 1) / (store.simpleChoice?.length) * 100
    return progreso
  };


  return (
    <div className="container">
      <div className="row">
        <div className="col"></div>
      </div>
      <div className="row"></div>
      <div className="row"></div>

    </div>
  
  );
}

