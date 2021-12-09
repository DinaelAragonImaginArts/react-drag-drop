//import from library
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

//import styles
import styles from './App.module.css'



const initialTasks = [
  {
    id: "1",
    text: "React.js"
  },
  {
    id: "2",
    text: "HTML/CSS"
  },
  {
    id: "3",
    text: "AWS"
  },
  {
    id: "4",
    text: "JavaScript"
  },

];
const initialTasksHorizontal = [
  {
    id: "1",
    text: "React.js"
  },
  {
    id: "2",
    text: "HTML/CSS"
  },
  {
    id: "3",
    text: "AWS"
  },
  {
    id: "4",
    text: "JavaScript"
  },

];


const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [tasksHorizontal, setTasksHorizontal] = useState(initialTasksHorizontal);

  return (
    <div className={styles.contenedor}>
      <div>
        <DragDropContext onDragEnd={
          (result) => {
            const { source, destination } = result;
            if ((!destination) || ((source.index === destination.index) && (source.droppableId === destination.droppableId))) {
              return;
            }
            setTasks(prevTasks => reorder(prevTasks, source.index, destination.index));
          }
        }>
          <div className={styles.app}>
            <h2> Temas Listados Vertical </h2>
            <Droppable droppableId='tasks'>
              {(droppableProvided) => <ul
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
                className={styles.taskContainer}>
                {tasks.map((tasks, index) =>
                  <Draggable key={tasks.id} draggableId={tasks.id} index={index}>
                    {(draggableProvided) => (
                      <li
                        {...draggableProvided.draggableProps}
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.dragHandleProps}
                        className={styles.taskItem}>
                        {tasks.text}
                      </li>
                    )}
                  </Draggable>
                )}
                {droppableProvided.placeholder}
              </ul>}
            </Droppable>
          </div>
        </DragDropContext>
      </div>
      <div>

        <DragDropContext onDragEnd={
          (result) => {
            const { source, destination } = result;
            if ((!destination) || ((source.index === destination.index) && (source.droppableId === destination.droppableId))) {
              return;
            }
            setTasksHorizontal(prevTasksHorizontal => reorder(prevTasksHorizontal, source.index, destination.index));
          }
        }>
          <div className={`${styles.app} + ${styles.listadoHorizontal}`}>
            <h2> Temas Listados Horizontalmente </h2>
            <Droppable droppableId='tasksHorizontal' direction='horizontal'>

              {(droppableProvidedHorizontal) => <ul
                {...droppableProvidedHorizontal.droppableProps}
                ref={droppableProvidedHorizontal.innerRef}
                className={styles.taskContainerHorizontal}>
                {tasksHorizontal.map((tasksHorizontal, index) =>
                  <Draggable key={tasksHorizontal.id} draggableId={tasksHorizontal.id} index={index}>
                    {(draggableProvidedHorizontal) => (
                      <li
                        {...draggableProvidedHorizontal.draggableProps}
                        ref={draggableProvidedHorizontal.innerRef}
                        {...draggableProvidedHorizontal.dragHandleProps}
                        className={styles.taskItem}>
                        {tasksHorizontal.text}
                      </li>
                    )}
                  </Draggable>
                )}
                {droppableProvidedHorizontal.placeholder}
              </ul>}
            </Droppable>
          </div>
        </DragDropContext>
      </div>
    </div>

  );
}

export default App;
