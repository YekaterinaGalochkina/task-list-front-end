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

  const toggleTaskComplete = (id) => {
    const endpoint = `${API_URL}/tasks/${id}`;
    axios.put(endpoint)
      .then(() => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === id ? { ...task, isComplete: !task.isComplete } : task
          )
        );
      })
      .catch((error) => {
        console.error('Error updating task:', error);
      });
    // const updatedTask = tasks.map(task => {
    //   if (task.id === id) {
    //     return { ...task, isComplete: !task.isComplete };
    //   }
    //   return task;
    // });
    // setTasks(updatedTask);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
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
