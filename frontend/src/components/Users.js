import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoApp from "./TodoApp";
import TodosModal from "./TodosModal";
import API_BASE_URL from "./ApiConfig";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userName, setUserName] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}user`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = (userId, userName) => {
    setModalOpen(true);
    setSelectedUser(userId);
    setUserName(userName);
  };

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <button onClick={() => handleUserClick(user.id, user.name)}>
              {user.name}
            </button>
          </li>
        ))}
      </ul>
      {modalOpen && (
        <TodosModal
          setModalOpen={setModalOpen}
          userId={selectedUser}
          userName={userName}
        />
      )}
    </div>
  );
};

export default Users;
