import React, { useState } from 'react';
import Pregunta from './Pregunta';


const Quiz = ({ numQuestions, onQuizSubmit, onNextSection }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState(Array.from({ length: numQuestions }, () => ({ question: '', options: ['', '', '', ''] })));

  const handleNextQuestion = () => {
    if (questions[currentQuestionIndex].question === '' || questions[currentQuestionIndex].options.some((o) => o === '')) {
      alert('Por favor, completa la pregunta y opciones antes de pasar a la siguiente.');
      return;
    }

    if (currentQuestionIndex + 1 < numQuestions) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onQuizSubmit(questions);
      onNextSection(); 
    }
  };

  return (
    <div>
      <Pregunta
        index={currentQuestionIndex}
        questionData={questions[currentQuestionIndex]}
        onChange={(updatedQuestionData) => {
          const updatedQuestions = [...questions];
          updatedQuestions[currentQuestionIndex] = updatedQuestionData;
          setQuestions(updatedQuestions);
        }}
        onNextQuestion={handleNextQuestion}
        isLastQuestion={currentQuestionIndex === numQuestions - 1}
      />
    </div>
  );
};

export default Quiz;
