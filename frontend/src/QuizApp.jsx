import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import { useAuthStore } from "./store/userAuthStore";
const QuizApp = () => {
  const location = useLocation();
  const formData = location.state?.formData || {};
  const [quizData, setQuizData] = useState([]); // Stores transformed questions
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { signup } = useAuthStore();

  const [total, setTotal] = useState(0); // Total number of questions
  const [correct, setCorrect] = useState(0); // Correct answers count

  // Fetch quiz from backend
  const fetchQuiz = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:6969/api/init-quiz", {
        subjects: formData.subjects,
        age: formData.age,
      });

      let rawJsonString = response.data[0][0];
      const cleanedString = rawJsonString
        .replace(/```json|```/g, " ")
        .replace(/\\n/g, " ")
        .replace(/\\/g, "");
      console.log(cleanedString); // raw backend json

      const parsedData = JSON.parse(cleanedString); // cleaned json
      console.log(parsedData);

      const formattedQuestions = parsedData.map((question) => {
        // separating options and questions
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
      setTotal(formattedQuestions.length); // Set total questions count
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

  // Function to check if selected answer is correct
  const handleAnswerClick = (selectedOption, correctAnswer) => {
    if (selectedOption === correctAnswer) {
      setCorrect((prev) => prev + 1);
    }
  };

  // Submit results
  const handleSubmit = async (e) => {
    e.preventDefault();
    setTimeout(() => {
      // Ensure latest values are printed
      console.log("Final Total:", total);
      console.log("Final Correct:", correct);
      formData.total = total;
      formData.correct = correct;
      signup(formData);
    }, 2000);
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
                    onClick={() => handleAnswerClick(option, q.correctAnswer)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))
        : !loading && <p>No quiz data available.</p>}

      {/* Submit Quiz */}
      {quizData.length > 0 && (
        <button
          onClick={handleSubmit}
          className="w-full px-4 py-2 mt-4 text-white bg-green-500 rounded-lg"
        >
          Submit Quiz
        </button>
      )}

      {/* Display Score */}
      <div className="mt-4 text-lg font-bold">
        Total Questions: {total} | Correct Answers: {correct}
      </div>
    </div>
  );
};

export default QuizApp;
