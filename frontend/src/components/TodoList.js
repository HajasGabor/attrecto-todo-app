import React, { useState } from "react";
import axios from "axios";
import "./TodoList.css";
import API_BASE_URL from "./ApiConfig";

const TodoList = ({
  todos,
  onUpdateTodo,
  onUpdateCompletionTodo,
  onDeleteTodo,
}) => {
  const [editedTitle, setEditedTitle] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editedDeadline, setEditedDeadline] = useState("");

  const sortedTodos = todos.slice().sort((a, b) => a.id - b.id);

  const handleUpdateCompletion = async (id, completed) => {
    await axios
      .put(`${API_BASE_URL}todos/${id}`, { completed: !completed })
      .then((response) => {
        onUpdateCompletionTodo(response.data.id, response.data.completed);
      })
      .catch((error) =>
        console.error("Error updating completion status:", error)
      );
  };

  const handleEdit = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setEditingTodoId(id);
    setEditedTitle(todoToEdit.title);
    setEditedDeadline(todoToEdit.deadline || "");
  };

  const handleUpdateTodo = async (id) => {
    await axios
      .put(`${API_BASE_URL}todos/${id}`, {
        title: editedTitle,
        deadline: editedDeadline,
      })
      .then((response) => {
        onUpdateTodo(
          response.data.id,
          response.data.title,
          response.data.deadline
        );
        setEditingTodoId(null);
        setEditedTitle("");
        setEditedDeadline("");
      })
      .catch((error) => console.error("Error updating todo:", error));
  };

  const handleDelete = (id) => {
    onDeleteTodo(id);
  };

  const handleKeyDown = (e, todoId) => {
    if (e.key === "Enter") {
      handleUpdateTodo(todoId);
    }
  };

  return (
    <div className="todo-container">
      <h2>Todo List</h2>
      <table className="todo-table">
        <thead>
          <tr>
            <th className="narrow">Done</th>
            <th>Task</th>
            <th>Deadline</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedTodos.map((todo) => (
            <tr
              key={todo.id}
              className={`todo-list-item${todo.completed ? " completed" : ""}${
                editingTodoId === todo.id ? " editing" : ""
              }`}
            >
              <td className="narrow">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() =>
                    handleUpdateCompletion(todo.id, todo.completed)
                  }
                  className="checkbox"
                />
              </td>
              <td>
                <span
                  className="title"
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {todo.title}
                </span>
                {editingTodoId === todo.id && (
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, todo.id)}
                    className="edit-input"
                  />
                )}
              </td>
              <td>
                {editingTodoId === todo.id ? (
                  <input
                    type="date"
                    value={editedDeadline}
                    onChange={(e) => {
                      setEditedDeadline(e.target.value);
                    }}
                    className="edit-input"
                  />
                ) : (
                  <span className="title">
                    {todo.deadline
                      ? new Date(todo.deadline).toLocaleDateString("hu-HU", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })
                      : "N/A"}
                  </span>
                )}
              </td>
              <td>
                {editingTodoId === todo.id ? (
                  <>
                    <button
                      onClick={() => handleUpdateTodo(todo.id)}
                      className="save-button"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(todo.id)}
                      className="edit-button"
                    >
                      Edit
                    </button>
                  </>
                )}
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
