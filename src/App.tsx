import React, { useState } from 'react';
import Modal from './Modal';
import './App.css';

const App: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="App">
      <button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        onClick={handleOpenModal}
      >
        Open Modal
      </button>
      
      <Modal show={showModal} onClose={handleCloseModal} />
    </div>
  );
}

export default App;
