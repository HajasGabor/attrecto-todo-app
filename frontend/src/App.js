import './App.css';
import TodosModal from './components/TodosModal';
import React, { useState } from 'react';

function App() {
  const [modalOpen, setModalOpen] = useState(false);


  return (
    <div className="App">
      <h1>Show TODOs</h1>
      <button
        className="openModalBtn"
        onClick={() => setModalOpen(true)}
      >
        Click Here!
      </button>
      {modalOpen && <TodosModal setModalOpen={setModalOpen} />}
    </div>
  );
}

export default App;
