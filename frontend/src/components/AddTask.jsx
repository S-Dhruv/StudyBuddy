import React, { useState } from "react";
import { Plus } from "lucide-react";
import axios from "axios";
import { axiosInstance } from "@/Axios/axios";
import { useAuthStore } from "@/store/userAuthStore";
export default function AddTask({ onAddTask }) {
  const { authUser } = useAuthStore();  
  const [formData, setFormData] = useState({
    title: "",
    topic: "",
    deadline: "",
    task_type: "Assignment",
    studyHours: 1,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post("/ai", {
        difficulty: "medium",
        deadline: formData.deadline,
        type: "study",
        studyHours: formData.studyHours,
        topic: formData.topic,
        userId: authUser.user._id, // Replace with actual user ID
        task_type: formData.task_type,
      });

      console.log("AI Response:", response.data);

      if (onAddTask) {
        onAddTask(response.data);
      }

      // Reset form
      setFormData({
        title: "",
        topic: "",
        deadline: "",
        task_type: "Assignment",
        studyHours: 1,
      });
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:w-1/3">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center mb-4">
          <Plus className="h-5 w-5 text-blue-500 mr-2" />
          <h2 className="text-lg font-semibold text-gray-700">Add New Task</h2>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Task Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Task Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter task title"
              required
            />
          </div>

          {/* Topic */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Topic
            </label>
            <input
              type="text"
              name="topic"
              value={formData.topic}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="E.g., Calculus, Programming"
              required
            />
          </div>

          {/* Task Type */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Task Type
            </label>
            <select
              name="task_type"
              value={formData.task_type}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="Assignment">Assignment</option>
              <option value="Test">Test</option>
            </select>
          </div>

          {/* Deadline */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deadline
            </label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Study Hours */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Study Hours (per day)
            </label>
            <input
              type="number"
              name="studyHours"
              value={formData.studyHours}
              onChange={handleInputChange}
              min="0.5"
              step="0.5"
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors"
            disabled={loading}
          >
            {loading ? "Adding Task..." : "Add Task"}
          </button>
        </form>
      </div>
    </div>
  );
}
