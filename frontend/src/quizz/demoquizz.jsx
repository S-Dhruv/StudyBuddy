import React, { useState } from 'react';
import { quizzes } from '../assets/data.js';

const QuizApp = () => {
  const [currentQuiz, setCurrentQuiz] = useState('personality_quiz');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const questions = quizzes[currentQuiz];

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(score + 1);
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
  };

  return (
    <div className="p-5 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Quiz Application</h1>
      <div className="mb-4">
        <button 
          className={`mr-2 p-2 rounded ${currentQuiz === 'personality_quiz' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
          onClick={() => setCurrentQuiz('personality_quiz')}
        >
          Personality Quiz
        </button>
        <button 
          className={`p-2 rounded ${currentQuiz === 'knowledge_quiz' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
          onClick={() => setCurrentQuiz('knowledge_quiz')}
        >
          Knowledge Quiz
        </button>
      </div>

      {showScore ? (
        <div className="text-center">
          <h2 className="text-xl font-bold">Your score: {score} / {questions.length}</h2>
          <button className="mt-4 p-2 bg-blue-500 text-white rounded" onClick={resetQuiz}>Retake Quiz</button>
        </div>
      ) : (
        <div>
          <h2 className="text-lg font-semibold">{questions[currentQuestionIndex].question}</h2>
          <div className="mt-4 space-y-2">
            {[...questions[currentQuestionIndex].wrong_options, questions[currentQuestionIndex].correct_option]
              .sort(() => Math.random() - 0.5)
              .map((option, index) => (
                <button
                  key={index}
                  className="w-full p-2 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => handleAnswer(option === questions[currentQuestionIndex].correct_option)}
                >
                  {option}
                </button>
              ))}
          </div>
          <div className="text-center mt-4">
            <p>Question {currentQuestionIndex + 1} of {questions.length}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizApp;
