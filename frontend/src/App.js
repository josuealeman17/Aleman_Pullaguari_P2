import React from "react";
import MultipleChoice from "./components/MultipleChoice.js";

const App = () => {
  const handleAddQuestion = (evaluationData) => {
    console.log("Evaluación Agregada:", evaluationData);
  };

  return (
    <div className="app__container">
      <div className="main__container">
        <h1>Sistema de Evaluaciones</h1>
        <MultipleChoice onAddQuestion={handleAddQuestion} />
      </div>
    </div>
  );
};

export default App;
