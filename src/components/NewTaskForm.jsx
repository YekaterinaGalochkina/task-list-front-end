import { useState } from 'react';
import PropTypes from 'prop-types';
const NewTaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(title);
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="new-task-form">
      <input
        type="text"
        id="task-title"
        name="task-title"
        placeholder="Enter new task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}/> <button type="submit">Add Task</button>
    </form>
  );
};

NewTaskForm.propTypes = {onAddTask: PropTypes.func.isRequired
};
export default NewTaskForm;