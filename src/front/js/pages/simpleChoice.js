
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

    let verificacion = await actions.getVerificar(respuestaSeleccionada.id)

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
    <div className="row d-flex justify-content-end">
      <div className='col-lg-10 col-sm-10 '>
        <div className='container-fluid mt-5'>
          {store.simpleChoice.length > 0 ? <div>
            {preguntaActual < store.simpleChoice.length ? (
              <div>
                <div className="mb-3 text-danger fs-1">
                  Curso de {modulo.toLocaleUpperCase()}
                </div>
                <div className="progress mb-3">
                  <div className="progress-bar" role="progressbar" style={{ width: `${progresoActual()}%` }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progresoActual()}%</div>
                </div>
                <div className="mb-3">{store.simpleChoice[preguntaActual] && <p className='fs-2 text-white'>{preguntaActual + 1}.{store.simpleChoice[preguntaActual].question}</p>}</div>
                <ul className="ps-0">
                  {store.simpleChoice[preguntaActual].answers.map((alternativa, indice) => <p key={indice} onClick={() => respuestaElegida(alternativa)}
                    className={`card-body rounded p-0 ps-4 fs-4 ${respuestaSeleccionada === alternativa ? "seleccionada":"bg-white text-dark"}`} >{alternativa.answers}</p>)}
                </ul>
                <div className="mt-4 d-flex justify-content-end" >
                  <button className="btn btn-primary" onClick={verificarRespuesta}>Siguiente</button>
                </div>
              </div>) : (
              <p className='d-flex flex-row justify-content-center alig-items-center'>¡Felicidades, has completado todas las preguntas!</p>
            )}
          </div> : ""}
        </div>
      </div>
    </div>
  );
}

