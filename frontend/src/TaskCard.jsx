import React from "react";
import {
  Clock,
  Calendar,
  BarChart,
  CheckSquare,
  FileText,
  BookOpen,
  Check,
  GraduationCap,
} from "lucide-react";
function TaskCard({ task }) {
  const isOverdue = () => {
    if (!task.deadline) return false;
    const deadlineDate = new Date(task.deadline);
    return deadlineDate < new Date() && !task.status;
  };

  // Format date from ISO to readable format
  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Determine status color
  const getStatusColor = () => {
    if (isOverdue()) return "bg-red-500";
    if (task.status) return "bg-green-500";
    return "bg-yellow-500";
  };

  // Determine task type color and icon
  const getTaskTypeInfo = () => {
    switch (task.task_type?.toLowerCase()) {
      case "assignment":
        return {
          color: "bg-blue-200 text-blue-800",
          icon: <FileText className="h-3 w-3 mr-1" />,
        };
      case "test":
        return {
          color: "bg-purple-200 text-purple-800",
          icon: <GraduationCap className="h-3 w-3 mr-1" />,
        };
      default:
        return {
          color: "bg-gray-200 text-gray-800",
          icon: <BookOpen className="h-3 w-3 mr-1" />,
        };
    }
  };

  const taskTypeInfo = getTaskTypeInfo();

  // Mark task as completed
  const markAsCompleted = () => {
    if (task.status) return; // Already completed
    onStatusChange({ ...task, status: true });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Card Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg text-gray-800 truncate">
            {task.title}
          </h3>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${taskTypeInfo.color}`}
          >
            {taskTypeInfo.icon}
            {task.task_type}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4">
        {/* Deadline */}
        <div className="flex items-center mb-3">
          <Calendar className="h-4 w-4 text-gray-500 mr-2" />
          <div className="text-sm text-gray-600">
            <span className="font-medium">Deadline:</span>{" "}
            {formatDate(task.deadline)}
            {isOverdue() && (
              <span className="text-red-500 ml-2 font-medium">Overdue</span>
            )}
          </div>
        </div>

        {/* Study Hours */}
        <div className="flex items-center mb-3">
          <Clock className="h-4 w-4 text-gray-500 mr-2" />
          <div className="text-sm text-gray-600">
            <span className="font-medium">Study Hours:</span> {task.studyHours}{" "}
            hours/day
          </div>
        </div>

        {/* Topic */}
        <div className="flex items-center mb-3">
          <BookOpen className="h-4 w-4 text-gray-500 mr-2" />
          <div className="text-sm text-gray-600">
            <span className="font-medium">Topic:</span> {task.topic}
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center mb-4">
          <Check className="h-4 w-4 text-gray-500 mr-2" />
          <div className="text-sm text-gray-600">
            <span className="font-medium">Status:</span>
            <span
              className={
                task.status
                  ? "text-green-600 ml-1 font-medium"
                  : "text-yellow-600 ml-1"
              }
            >
              {task.status ? "Completed" : "Pending"}
            </span>
          </div>
        </div>

        {/* Complete Button */}
        {!task.status && (
          <button
            onClick={markAsCompleted}
            className="w-full mt-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md flex items-center justify-center transition-colors"
          >
            <Check className="h-4 w-4 mr-2" />
            Mark as Completed
          </button>
        )}
      </div>

      {/* Card Footer */}
      <div className="px-4 py-3 bg-gray-50 flex justify-between items-center">
        <div className={`w-3 h-3 rounded-full ${getStatusColor()}`}></div>

        <div className="text-xs text-gray-500">
          {new Date(task.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
