import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './TodoList';
import './TodoApp.css';
import API_BASE_URL from './ApiConfig';

const TodoApp = ({ userId, userName }) => {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}user/${userId}`);
        setTodos(response.data.todos);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
  
    fetchTodos();
  }, [userId]);

  const handleCreateTodo = () => {
    axios
      .post(`${API_BASE_URL}todos/${userId}`, { title: newTodo })
      .then((response) => {
        console.log('Todo created:', response.data);
        // Update the todos state to reflect the new todo
        setTodos([...todos, response.data]);
        // Clear the input field
        setNewTodo('');
      })
      .catch((error) => console.error('Error creating todo:', error));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCreateTodo();
    }
  };

  const handleUpdateTitleTodo = (id, updatedTitle) => {
    axios
      .put(`${API_BASE_URL}todos/${id}`, { title: updatedTitle })
      .then((response) => {
        console.log('Title updated:', response.data);
        setTodos((prevTodos) =>
          prevTodos.map((todo) => (todo.id === response.data.id ? response.data : todo))
        );
      })
      .catch((error) => console.error('Error updating todo:', error));
  };

  const handleUpdateCompletionTodo = (id, completed) => {
    axios
      .put(`${API_BASE_URL}todos/${id}`, { completed: completed })
      .then((response) => {
        console.log('Completion changed:', response.data);
        const { title } = response.data;
        setTodos((prevTodos) =>
          prevTodos.map((todo) => (todo.id === id ? { ...todo, completed, title } : todo))
        );
      })
      .catch((error) => console.error('Error updating todo:', error));
  };

  const handleDeleteTodo = (id) => {
    axios
      .delete(`${API_BASE_URL}todos/${id}`)
      .then(() => {
        console.log('Deleted:', id.title);
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      })
      .catch((error) => console.error('Error deleting todo:', error));
  };

  return (
    <div className="container">
      <h1>{userName}</h1>
      <input 
        type="text" 
        value={newTodo} 
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyDown={handleKeyDown}
        className="new-todo-input"
        placeholder="Enter a new todo..."
      />
      <button onClick={handleCreateTodo} className="narrow-button">
        Add Todo
      </button>
      <TodoList 
        todos={todos} 
        onUpdateTitleTodo={handleUpdateTitleTodo} 
        onUpdateCompletionTodo={handleUpdateCompletionTodo} 
        onDeleteTodo={handleDeleteTodo} 
      />
    </div>
  );
};

export default TodoApp;
