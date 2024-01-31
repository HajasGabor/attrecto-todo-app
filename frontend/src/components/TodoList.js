import React, { useState } from 'react';
import axios from 'axios';
import './TodoList.css';

const TodoList = ({ todos, onUpdateTitleTodo, onUpdateCompletionTodo, onDeleteTodo }) => {
    const [editedTitle, setEditedTitle] = useState('');
    const [editingTodoId, setEditingTodoId] = useState(null);
  
    const sortedTodos = todos.slice().sort((a, b) => a.id - b.id);
  
    const handleUpdateCompletion = (id, completed) => {
      axios
        .put(`http://localhost:3000/todos/${id}`, { completed: !completed })
        .then((response) => {
          onUpdateCompletionTodo(response.data.id, response.data.completed);
        })
        .catch((error) => console.error('Error updating completion status:', error));
    };
  
    const handleEdit = (id) => {
      setEditingTodoId(id);
      setEditedTitle(todos.find((todo) => todo.id === id).title);
    };
  
    const handleUpdateTitle = (id) => {
      axios
        .put(`http://localhost:3000/todos/${id}`, { title: editedTitle })
        .then((response) => {
          onUpdateTitleTodo(response.data.id, response.data.title);
          setEditingTodoId(null);
          setEditedTitle('');
        })
        .catch((error) => console.error('Error updating todo:', error));
    };
  
    const handleDelete = (id) => {
      onDeleteTodo(id);
    };

    const handleKeyDown = (e, todoId) => {
        if (e.key === 'Enter') {
            handleUpdateTitle(todoId);
        }
    };
  
    return (
        <div>
          <h2>Todo List</h2>
          <ul>
            {sortedTodos.map((todo) => (
              <li
                key={todo.id}
                className={`todo-list-item${todo.completed ? ' completed' : ''}${editingTodoId === todo.id ? ' editing' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleUpdateCompletion(todo.id, todo.completed)}
                  className="checkbox"
                />
                <span className="title" style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                  {todo.title}
                </span>
                {editingTodoId === todo.id ? (
                  <>
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, todo.id)}
                      className="edit-input"
                    />
                    <button onClick={() => handleUpdateTitle(todo.id)} className="save-button">
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(todo.id)} className="edit-button">
                      Edit
                    </button>
                  </>
                )}
                <button onClick={() => handleDelete(todo.id)} className="delete-button">
                    Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      );
      
  };
  
  export default TodoList;
