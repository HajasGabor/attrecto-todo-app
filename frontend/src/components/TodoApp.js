import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoList from "./TodoList";
import "./TodoApp.css";
import API_BASE_URL from "./ApiConfig";
import UploadFile from "./UploadFile";
import { Buffer } from "buffer";

const TodoApp = ({ userId, userName, setUserName, setModalOpen }) => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureUploaded, setProfilePictureUploaded] = useState(false);
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}user/${userId}`);
        setTodos(response.data.todos);

        const imageData = response.data.profilePicture.data;
        const imageBuffer = Buffer.isBuffer(imageData)
          ? imageData
          : Buffer.from(imageData);

        setProfilePicture(imageBuffer.toString("base64"));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId, profilePictureUploaded, userName]);

  const handleCreateTodo = () => {
    if (!newTodo.trim()) {
      alert("Please enter a valid todo title");
      return;
    }
    if (!deadline.trim()) {
      alert("Please enter a valid deadline");
      return;
    }
    axios
      .post(`${API_BASE_URL}todos/${userId}`, {
        title: newTodo,
        deadline: deadline,
      })
      .then((response) => {
        console.log("Todo created:", response.data);
        setTodos([...todos, response.data]);
        setNewTodo("");
        setDeadline("");
      })
      .catch((error) => console.error("Error creating todo:", error));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCreateTodo();
    }
  };

  const handleUpdateTitleTodo = (id, updatedTitle) => {
    axios
      .put(`${API_BASE_URL}todos/${id}`, { title: updatedTitle })
      .then((response) => {
        console.log("Title updated:", response.data);
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === response.data.id ? response.data : todo
          )
        );
      })
      .catch((error) => console.error("Error updating todo:", error));
  };

  const handleUpdateCompletionTodo = (id, completed) => {
    axios
      .put(`${API_BASE_URL}todos/${id}`, { completed: completed })
      .then((response) => {
        console.log("Completion changed:", response.data);
        const { title } = response.data;
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, completed, title } : todo
          )
        );
      })
      .catch((error) => console.error("Error updating todo:", error));
  };

  const handleDeleteTodo = (id) => {
    axios
      .delete(`${API_BASE_URL}todos/${id}`)
      .then(() => {
        console.log("Deleted:", id.title);
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      })
      .catch((error) => console.error("Error deleting todo:", error));
  };

  const handleFileChange = (file) => {
    setProfilePicture(file);
  };

  const handleRenameUser = async () => {
    const updatedUserName = prompt("Enter the new username:", userName);

    if (updatedUserName && updatedUserName.trim() !== "") {
      await axios
        .put(`${API_BASE_URL}user/${userId}`, { name: updatedUserName })
        .then((response) => {
          console.log("User renamed:", response.data);
          setUserName(updatedUserName);
        })
        .catch((error) => console.error("Error renaming user:", error));
    }
  };

  const handleDeleteUser = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmDelete) {
      axios
        .delete(`${API_BASE_URL}user/${userId}`)
        .then(() => {
          console.log("User deleted:", userName);
          setModalOpen(false);
        })
        .catch((error) => console.error("Error deleting user:", error));
    }
  };

  const handleUploadProfilePicture = async () => {
    if (profilePicture) {
      const formData = new FormData();
      formData.append("profilePicture", profilePicture);
      console.log("profilePicture:", profilePicture);

      try {
        const response = await axios.post(
          `${API_BASE_URL}user/uploadProfilePicture/${userId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Profile picture uploaded:", response.data);
        setProfilePictureUploaded(true);
      } catch (error) {
        console.error("Error uploading profile picture:", error);
      }
    }
  };

  return (
    <div className="container">
      <UploadFile
        onFileChange={handleFileChange}
        onUpload={handleUploadProfilePicture}
        profilePicture={profilePicture}
        profilePictureUploaded={profilePictureUploaded}
      />

      <div className="user-actions">
        <h1>{userName}</h1>
        <button onClick={handleRenameUser} className="action-button">
          Rename User
        </button>
        <button onClick={handleDeleteUser} className="action-button">
          Delete User
        </button>
      </div>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyDown={handleKeyDown}
        className="new-todo-input"
        placeholder="Enter a new todo..."
        required
      />
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        className="deadline-input"
        placeholder="Enter deadline..."
        required
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
