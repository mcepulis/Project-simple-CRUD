import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null); 

  useEffect(() => {
    fetch('http://localhost:5559/api/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))
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
        setTasks([...tasks, data]);
        setNewTaskTitle('');
      })
      .catch(console.error);
  };
  
  const handleEditTask = (id, title) => {
    setEditingTaskId(id); 
    setNewTaskTitle(title);
  };

  const handleUpdateTask = (id) => {
    fetch(`http://localhost:5559/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: newTaskTitle }),
    })
      .then(res => res.json())
      .then(updatedTask => {
        setTasks(tasks.map(task => {
          if (task.id === id) {
            return { ...task, title: updatedTask.title };
          }
          return task;
        }));
        setEditingTaskId(null); 
        setNewTaskTitle(''); 
      })
      .catch(console.error);
  };

  const handleDeleteTask = id => {
    fetch(`http://localhost:5559/api/tasks/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setTasks(tasks.filter(task => task.id !== id));
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
          onChange={e => setNewTaskTitle(e.target.value)}
        />
        {editingTaskId ? (
          <button onClick={() => handleUpdateTask(editingTaskId)}>Update Task</button>
        ) : (
          <button onClick={handleAddTask}>Add Task</button>
        )}
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.id === editingTaskId ? (
              <input
                type="text"
                value={newTaskTitle}
                onChange={e => setNewTaskTitle(e.target.value)}
              />
            ) : (
              task.title
            )}
            {task.id === editingTaskId ? (
              <button onClick={() => handleUpdateTask(task.id)}>Save</button>
            ) : (
              <>
                <button onClick={() => handleEditTask(task.id, task.title)}>Edit</button>
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
