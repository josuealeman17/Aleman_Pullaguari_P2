// Pregunta.js

import React from 'react';

const Pregunta = ({ index, questionData, onChange, onNextQuestion, isLastQuestion }) => {
  const handleInputChange = (e) => {
    onChange({ ...questionData, question: e.target.value });
  };

  const handleOptionChange = (e, optionIndex) => {
    const updatedOptions = [...questionData.options];
    updatedOptions[optionIndex] = e.target.value;
    onChange({ ...questionData, options: updatedOptions });
  };

  const handleNextClick = () => {
    onNextQuestion();
  };

  return (
    <div>
      <h4>Pregunta {index + 1}</h4>
      <label>
        Pregunta:
        <input
          type="text"
          value={questionData.question}
          onChange={handleInputChange}
        />
      </label>
      <form>
        {questionData.options.map((option, optionIndex) => (
          <div key={optionIndex}>
            <label>
              Opción {optionIndex + 1}:
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(e, optionIndex)}
              />
            </label>
          </div>
        ))}
      </form>
      <button onClick={handleNextClick} >
        {isLastQuestion ? 'Crear Evaluación' : 'Siguiente Pregunta'}
      </button>
    </div>
  );
};

export default Pregunta;
