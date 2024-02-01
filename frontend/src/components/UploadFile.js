import React, { useState } from "react";
import defaultAvatar from "../avatar.jpg";
import "./UploadFile.css";

const UploadFile = ({ onFileChange, onUpload, profilePicture }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);
      onFileChange(file);
    }
  };

  const handleUpload = () => {
    onUpload(selectedFile);
  };

  const handleAvatarClick = (e) => {
    e.preventDefault();

    document.getElementById("fileInput").click();
  };

  return (
    <div>
      <label htmlFor="fileInput" className="avatar-label">
        {profilePicture ? (
          <img
            src={`data:image/*;base64,${profilePicture}`}
            alt="Profile Picture"
            className="image"
          />
        ) : (
          <img
            src={defaultAvatar}
            alt="Profile Picture"
            onClick={() => document.getElementById("fileInput").click()}
            className="image"
          />
        )}
        <div className="overlay">
          <span className="camera-icon">&#128247;</span>
          <span className="hover-text">Change Picture</span>
        </div>
        <input
          type="file"
          accept="image/*"
          id="fileInput"
          onChange={handleFileChange}
          className="file-input"
        />
      </label>
      {selectedFile && (
        <button onClick={handleUpload} className="narrow-button">
          Upload Profile Picture
        </button>
      )}
    </div>
  );
};

export default UploadFile;
