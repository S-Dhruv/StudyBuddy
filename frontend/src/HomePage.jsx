import { useState } from "react";
import React from "react";
import DisplayCards from "@/components/DisplayCards";
import AddTask from "@/components/AddTask";
export default function HomePage() {
  const [tasks, setTasks] = useState([
    {
      id: "task1",
      title: "Data Structures Homework",
      topic: "Binary Trees",
      deadline: "2025-03-20",
      task_type: "Assignment",
      studyHours: 2,
      status: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: "task2",
      title: "Algorithms Midterm",
      topic: "Graph Algorithms",
      deadline: "2025-03-25",
      task_type: "Test",
      studyHours: 3,
      status: false,
      createdAt: new Date().toISOString(),
    },
  ]);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };
  const handleStatusChange = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Study Task Manager
      </h1>
      <div className="flex flex-col md:flex-row gap-6">
        <DisplayCards tasks={tasks} onStatusChange={handleStatusChange} />
        <AddTask onAddTask={handleAddTask} />
      </div>
    </div>
  );
}
