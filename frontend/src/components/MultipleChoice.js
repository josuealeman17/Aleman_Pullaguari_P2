// MultipleChoice.js

import React from "react";
import Profesor from "./Profesor";
import Quiz from "./Quiz";

const MultipleChoice = ({ onAddQuestion }) => {
  const [currentSection, setCurrentSection] = React.useState(0);
  const [professorName, setProfessorName] = React.useState("");
  const [numQuestions, setNumQuestions] = React.useState(0);
  const [evaluationCompleted, setEvaluationCompleted] = React.useState(false);

  const handleProfessorNameSubmit = (name) => {
    setProfessorName(name);
    setCurrentSection(1);
  };

  const handleQuizSubmit = (questions) => {
    onAddQuestion({ professorName, questions });
    setCurrentSection(0);
    setProfessorName("");
    setNumQuestions(0);
    setEvaluationCompleted(true);
  };

  const handleNextSection = () => {
    if (currentSection === 0 && professorName === "") {
      alert("Por favor, ingresa el nombre del profesor.");
      return;
    }

    if (currentSection === 1 && (numQuestions <= 0 || isNaN(numQuestions))) {
      alert("Por favor, ingresa un número válido de preguntas.");
      return;
    }

    setCurrentSection(currentSection + 1);
  };

  const resetEvaluation = () => {
    setEvaluationCompleted(false);
    setCurrentSection(0);
  };

  return (
    <div>
      {currentSection === 0 && (
        <Profesor onProfessorNameSubmit={handleProfessorNameSubmit} />
      )}
      {currentSection === 1 && (
        <div>
          <h3>¿Cuantas preguntas deseas implementar?</h3>
          <label>
            <input
              type="number"
              value={numQuestions}
              onChange={(e) => setNumQuestions(parseInt(e.target.value))}
            />
          </label>
          <button onClick={() => setCurrentSection(0)}>Atrás</button>
          <button onClick={() => setCurrentSection(2)}>Siguiente</button>
        </div>
      )}
      {currentSection === 2 && !evaluationCompleted && (
        <Quiz
          numQuestions={numQuestions}
          onQuizSubmit={handleQuizSubmit}
          onNextSection={handleNextSection}
        />
      )}
      {evaluationCompleted && (
        <div>
          <h3>Evaluación completada</h3>
          <p>Gracias por agregar la evaluación, {professorName}.</p>
          <button onClick={resetEvaluation}>Agregar otra evaluación</button>
        </div>
      )}
    </div>
  );
};

export default MultipleChoice;
