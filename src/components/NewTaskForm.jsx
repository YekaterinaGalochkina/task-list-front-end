import PropTypes from 'prop-types';
import { useState } from 'react';

const NewTaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');


  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddTask({ title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <section>
        <label>Title</label>
        <input type="text" value={title} onChange={handleTitleChange} />

        <label>Description</label>
        <input type="text" value={description} onChange={handleDescriptionChange} />

        <button type="submit">Add Task</button>
      </section>
    </form>
  );
};

NewTaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired
};

export default NewTaskForm;
