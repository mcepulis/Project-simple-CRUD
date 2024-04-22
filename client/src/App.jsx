import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'

function App() {
  const [tasks, newTasks] = useState([]);
  const [newTaskTitle, createTask] = useState('');

  useEffect(() => {
    fetch('http://localhost:5559/api/tasks')
      .then(res => res.json())
      .then(data => {
        console.log(data); 
        newTasks(data);
      })
      .catch(console.error);
  }, []);


  const handleAddTask = () => {
    fetch('http://localhost:5559/api/tasks', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({ title: newTaskTitle }),
    })
    .then(res => res.json())
    .then(data => {
       newTasks([...tasks, data]);
       createTask('');
    })
     .catch(console.error);
  };
  
const handleDeleteTask = id => {
  fetch('http://localhost:5559/api/tasks/' + id, {
    method: 'DELETE',
   })
   .then(() => {
    newTasks(tasks.filter(task => task.id !== id));
   })
   .catch(console.error);
};

  return (
    <div>
    <h1>Task Manager</h1>
    <div>
      <input
        type="text"
        value={newTaskTitle}
        onChange={e => createTask(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
    <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title}
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
    </ul>
  </div>
  )
  
}

export default App;