import React, { useState } from 'react';

const Profesor = ({ onProfessorNameSubmit}) => {
  const [professorName, setProfessorName] = useState('');

  const handleProfessorNameChange = (e) => {
    setProfessorName(e.target.value);
  }

  const handleProfessorNameSubmit = () => {
    if (professorName === '') {
      alert('Por favor, ingresa el nombre del profesor.');
      return;
    }

    onProfessorNameSubmit(professorName);
  };

  return (
    <div>
      <h3>Nombre del Profesor</h3>
      <label>
        <input
          type="text"
          value={professorName}
          onChange={handleProfessorNameChange}
        />
      </label>
      <button onClick={handleProfessorNameSubmit}>Siguiente</button>
    </div>
  );
};

export default Profesor;
