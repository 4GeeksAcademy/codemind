import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { exercisesData } from '../store/data'; // Asegúrate de que la ruta sea correcta
import "../../styles/index.css";

export function DragAndDropList() {
  const [data, setData] = useState(exercisesData); // Usar un estado para los datos

  const onDragEnd = (result) => {
    if (!result.destination) return; // No se soltó en una ubicación válida

    const { source, destination } = result;

    // Copiar el arreglo de datos actual
    const newData = [...data];

    // Encontrar la pregunta de origen y el elemento arrastrado
    const sourceQuestion = newData.find((question) => question.questionId === source.droppableId);
    const draggedElement = sourceQuestion.elements[source.index];

    // Quitar el elemento de la pregunta de origen
    sourceQuestion.elements.splice(source.index, 1);

    // Encontrar la pregunta de destino
    const destinationQuestion = newData.find((question) => question.questionId === destination.droppableId);

    // Insertar el elemento en la pregunta de destino en la posición adecuada
    destinationQuestion.elements.splice(destination.index, 0, draggedElement);

    // Actualizar el estado con los nuevos datos reordenados
    setData(newData);
  };

  return (
    <div className="d-flex justify-content-end align-items-center vh-100">
      <div className="w-50">
        <DragDropContext onDragEnd={onDragEnd}>
          {data.map((question, questionIndex) => (
            <div key={question.questionId}>
              <div className="h2 text-primary">
                {question.question}
              </div>
              <Droppable droppableId={`droppable-${question.questionId}`} key={questionIndex}>
                {(provided) => (
                  <ul {...provided.droppableProps} ref={provided.innerRef}>
                    {question.elements.map((element, elementIndex) => (
                      <Draggable
                        key={element.id}
                        draggableId={element.id.toString()}
                        index={elementIndex}
                      >
                        {(provided, snapshot) => (
                          <li
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className='m-4'
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
            </div>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}
