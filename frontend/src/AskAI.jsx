import React, { useState } from "react";
import axios from "axios";

const QuizApp = () => {
  const [quizData, setQuizData] = useState([]); // Stores transformed questions
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch quiz from backend
  const fetchQuiz = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:6969/api/init-quiz", {
        subjects: ["Math", "English"],
        age: "19",
      });
      let rawJsonString = response.data[0][0]; // raw backend json
      const cleanedString = rawJsonString
        .replace(/```json|```/g, " ")
        .replace(/\\n/g, " ")
        .replace(/\\/g, "");

      const parsedData = JSON.parse(cleanedString); // cleaned json
      console.log(parsedData);

      const formattedQuestions = parsedData.map((question) => { // separating options and questions
        const allOptions = [question.correct_option, ...question.wrong_options];

        const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);

        return {
          question: question.question || "No question available",
          options: shuffledOptions,
          correctAnswer: question.correct_option,
        };
      });

      console.log(formattedQuestions);
      setQuizData(formattedQuestions);
    } catch (err) {
      console.error(
        "Error fetching quiz:",
        err.response ? err.response.data : err.message
      );
      setError("Failed to fetch quiz data. Please try again.");
      setQuizData([]);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-lg p-5 mx-auto mt-10 border rounded-lg shadow-lg">
      <h1 className="mb-5 text-2xl font-bold">Knowledge Quiz</h1>

      {/* Fetch Button */}
      <button
        onClick={fetchQuiz}
        className="px-4 py-2 mb-4 text-white bg-blue-500 rounded-lg"
        disabled={loading}
      >
        {loading ? "Loading..." : "Start Quiz"}
      </button>

      {/* Error Handling */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Display Quiz Questions & Options */}
      {quizData.length > 0
        ? quizData.map((q, qIndex) => (
            <div key={qIndex} className="mb-4">
              <h2 className="text-lg font-semibold">{q.question}</h2>
              <div className="mt-2">
                {q.options.map((option, oIndex) => (
                  <button
                    key={oIndex}
                    className="block w-full p-2 my-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))
        : !loading && <p>No quiz data available.</p>}
    </div>
  );
};

export default QuizApp;
