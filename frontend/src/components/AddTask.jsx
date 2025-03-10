import React, { useState } from "react";
import { Plus } from "lucide-react";

export default function AddTask({ onAddTask }) {
  const [formData, setFormData] = useState({
    title: "",
    topic: "",
    deadline: "",
    task_type: "Assignment",
    studyHours: 1,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      ...formData,
      id: `task-${Date.now()}`, // Corrected string interpolation
      status: false,
      createdAt: new Date().toISOString(),
    };

    if (onAddTask) {
      onAddTask(newTask);
    }

    // Reset form
    setFormData({
      title: "",
      topic: "",
      deadline: "",
      task_type: "Assignment",
      studyHours: 1,
    });
  };

  return (
    <div className="md:w-1/3">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center mb-4">
          <Plus className="h-5 w-5 text-blue-500 mr-2" />
          <h2 className="text-lg font-semibold text-gray-700">Add New Task</h2>
        </div>

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
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}
