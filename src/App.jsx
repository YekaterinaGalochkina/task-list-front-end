import TaskList from './components/TaskList.jsx';
import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

const API_URL = 'http://127.0.0.1:5000';
const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(()=>{
    axios.get(`${API_URL}/tasks`)
      .then((response) =>{
        setTasks(response.data);
      })
      .catch((error)=>{
        console.error('Error fetching tasks:', error);
      });
  },[]);

  const toggleTaskComplete = (id, markComplete) => {
    const tail = !markComplete ? 'mark_complete' : 'mark_incomplete';
    const endpoint = `${API_URL}/tasks/${id}/${tail}`;
    axios.patch(endpoint)
      .then(() => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === id ? { ...task, is_complete: !task.is_complete } : task
          )
        );
      })
      .catch((error) => {
        console.error('Error updating task:', error);
      });
  };

  const deleteTask = (id) => {
    axios.delete(`${API_URL}/tasks/${id}`)
      .then(() => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>{<TaskList
          tasks={tasks}
          onToggleComplete={toggleTaskComplete}
          onDeleteTask={deleteTask}
        />}</div>
      </main>
    </div>
  );
};

export default App;
