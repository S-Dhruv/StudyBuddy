import React from "react";
import axios from "axios";
const AskAI = () => {
  const ask = async () => {
    try {
      const response = await axios.post("http://localhost:6969/quiz", {
        // difficulty: "easy",
        // deadline: "20 days",
        // est: "24 hours",
        // type: "medium",
        // studyHours: "5 hours",
        // topic: "Math",
        subjects: ["Math", "english"],
        age: "19",
      });
      console.log(response.data.kwargs.content);
    } catch (err) {
      console.error("Error:", err.response ? err.response.data : err.message); // Improved error handling
    }
  };
  return (
    <div>
      <button onClick={ask}>Ask to make a plan</button>
    </div>
  );
};

export default AskAI;
