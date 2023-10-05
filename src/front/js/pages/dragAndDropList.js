import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export function DragAndDropList() {
  const initialQuestions = [
    {
      id: 1,
      content: '¿Cuál es el orden correcto de la estructura básica de un documento HTML?',
      elements: [
        { id: 101, content: '<!DOCTYPE html>' },
        { id: 102, content: '<html>' },
        { id: 103, content: '<head>' },
        { id: 104, content: '<body>' },
      ],
      correctOrder: [
        '<!DOCTYPE html>',
        '<html>',
        '<head>',
        '<body>',
      ],
    },
    {
      id: 2,
      content: 'Ordena las etiquetas de encabezado HTML de menor a mayor importancia:',
      elements: [
        { id: 201, content: '<h6>' },
        { id: 202, content: '<h3>' },
        { id: 203, content: '<h1>' },
        { id: 204, content: '<h2>' },
      ],
      correctOrder: [
        '<h1>',
        '<h2>',
        '<h3>',
        '<h6>',
      ],
    },
    {
      id: 3,
      content: '¿Cuál es el orden correcto de las etiquetas para crear una lista desordenada en HTML?',
      elements: [
        { id: 301, content: '<ul>' },
        { id: 302, content: '<li>' },
        { id: 303, content: '</ul>' },
        { id: 304, content: '</li>' },
      ],
      correctOrder: [
        '<ul>',
        '<li>',
        '</li>',
        '</ul>',
      ],
    },
  ];

  const [questions, setQuestions] = useState(initialQuestions);

  const onDragEnd = (result, questionId) => {
    if (!result.destination) return; // No se soltó en una ubicación válida

    const newQuestions = [...questions];
    const questionIndex = newQuestions.findIndex((q) => q.id === questionId);

    if (questionIndex !== -1) {
      const question = newQuestions[questionIndex];
      const newElements = [...question.elements];
      const [reorderedElement] = newElements.splice(result.source.index, 1);
      newElements.splice(result.destination.index, 0, reorderedElement);

      question.elements = newElements;
      newQuestions[questionIndex] = question;

      setQuestions(newQuestions);
    }
  };

  const verificarRespuesta = (questionId) => {
    const question = questions.find((q) => q.id === questionId);

    if (!question) {
      return; // La pregunta no se encontró
    }

    const currentOrder = question.elements.map((element) => element.content);
    const isOrderCorrect = JSON.stringify(currentOrder) === JSON.stringify(question.correctOrder);

    if (isOrderCorrect) {
      alert(`¡Respuesta Correcta para la pregunta ${questionId}! El orden es correcto.`);
    } else {
      alert(`Respuesta Incorrecta para la pregunta ${questionId}. El orden es incorrecto. Inténtalo de nuevo.`);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center ">
      <div className="row">
        <h2 className="text-center offset-3 col-6">Arrastra y Suelta los Elementos</h2>
        <div className="offset-3 col-6">
          {questions.map((question) => (
            <div key={question.id}>
              <h3>{question.content}</h3>
              <DragDropContext onDragEnd={(result) => onDragEnd(result, question.id)}>
                <Droppable droppableId={`droppable-${question.id}`}>
                  {(provided) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef} className="list-unstyled">
                      {question.elements.map((element, index) => (
                        <Draggable
                          key={element.id}
                          draggableId={element.id.toString()}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <li
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className="m-2 p-3 border"
                            >
                              {element.content}
                            </li>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
              <button onClick={() => verificarRespuesta(question.id)} className="btn btn-primary mt-3">
                Verificar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
