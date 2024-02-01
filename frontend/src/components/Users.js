import React, { useState, useEffect } from "react";
import axios from "axios";
import TodosModal from "./TodosModal";
import API_BASE_URL from "./ApiConfig";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userName, setUserName] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);

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

  const handleCreateUser = async () => {
    try {
      if (!newUserName.trim() || !newEmail.trim()) {
        alert("Please enter a valid user name and email");
        return;
      }
      const response = await axios.post(`${API_BASE_URL}user`, {
        name: newUserName,
        email: newEmail,
      });

      setUsers((prevUsers) => [...prevUsers, response.data]);
      setNewUserName("");
      setNewEmail("");
      setCreatingUser(false);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="userList">
      {creatingUser ? (
        <div>
          <h1>Create User</h1>
          <input
            type="text"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            placeholder="Enter a new user name..."
            required
          />
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="Enter an email address..."
            required
          />
          <button onClick={handleCreateUser} className="addUserBtn">
            Add User
          </button>
          <button onClick={() => setCreatingUser(false)} className="cancelBtn">
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <h1>User List</h1>
          <div>
            <ul>
              {users.map((user) => (
                <li key={user.id}>
                  <button onClick={() => handleUserClick(user.id, user.name)}>
                    {user.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button onClick={() => setCreatingUser(true)} className="userListBtn">
            Create User
          </button>
        </div>
      )}
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
