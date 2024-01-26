import React, { useState } from "react";
import Profesor from "./Profesor";
import Quiz from "./Quiz";
import '../App.css'

const MultipleChoice = ({ onAddQuestion }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [professorName, setProfessorName] = useState("");
  const [numQuestions, setNumQuestions] = useState(0);
  const [evaluationCompleted, setEvaluationCompleted] = useState(false);
  const [questions, setQuestions] = useState([]);

  const handleProfessorNameSubmit = (name) => {
    setProfessorName(name);
    setCurrentSection(1);
  };

  const handleQuizSubmit = (questions) => {
    setQuestions(questions);
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
    setQuestions([]);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/evaluaciones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ profesor: professorName, preguntas: questions }),
      });
      if (response.ok) {
        alert("Evaluación guardada exitosamente");
        resetEvaluation();
      } else {
        throw new Error("Error al guardar la evaluación");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al guardar la evaluación");
    }
  };

  return (
    <div className="multiple__choice">
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
          <hr />
          <button onClick={handleSubmit}>Guardar Evaluación</button>
        </div>
      )}
    </div>
  );
};

export default MultipleChoice;
