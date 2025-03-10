import React, { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  Brain,
  CheckCircle2,
  RefreshCw,
  AlertCircle,
  Target,
} from "lucide-react";
import { axiosInstance } from "@/Axios/axios";
import { useAuthStore } from "@/store/userAuthStore";
function DisplayCards({ onStatusChange }) {
  const { authUser } = useAuthStore();
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const retrieve = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/get-tasks", {
        userId: authUser.user._id,
      });

      console.log("Fetched Data:", response.data.tasks);

      const today = new Date().toISOString().split("T")[0];
      const filteredTasks = response.data.tasks
        .filter((item) => item.userId === authUser.user._id)
        .flatMap((item) => (item.date.startsWith(today) ? item.tasks : []));

      console.log(filteredTasks);
      setTasks(filteredTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGet = async (e) => {
    e.preventDefault();
    await retrieve();
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      Easy: "bg-green-100 text-green-800",
      Medium: "bg-yellow-100 text-yellow-800",
      Hard: "bg-red-100 text-red-800",
    };
    return colors[difficulty] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="md:w-3/4 mx-auto px-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
        <div className="border-b border-gray-200 bg-gray-50 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Today's Tasks</h2>
            <button
              onClick={handleGet}
              disabled={isLoading}
              className={`inline-flex items-center px-4 py-2 rounded-lg ${
                isLoading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
              } text-white transition-colors duration-150 ease-in-out`}
            >
              <RefreshCw
                className={`w-5 h-5 mr-2 ${isLoading ? "animate-spin" : ""}`}
              />
              {isLoading ? "Fetching..." : "Refresh Tasks"}
            </button>
          </div>
        </div>

        <div className="p-6">
          {tasks.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-xl text-gray-500">
                No tasks scheduled for today
              </p>
              <p className="text-gray-400 mt-2">
                Click the refresh button to check for new tasks
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((task, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-200 hover:shadow-md"
                >
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 flex-1">
                        {task.task}
                      </h3>
                      <span
                        className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(
                          task.difficulty
                        )}`}
                      >
                        {task.difficulty}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{task.estimatedTime}</span>
                      </div>

                      <div className="flex items-center text-gray-600">
                        <Brain className="w-4 h-4 mr-2" />
                        <span>
                          {task.isAiPlanned ? "AI Planned" : "Manually Planned"}
                        </span>
                      </div>

                      <div className="flex items-center text-gray-600">
                        <CheckCircle2
                          className={`w-4 h-4 mr-2 ${
                            task.status ? "text-green-500" : "text-gray-400"
                          }`}
                        />
                        <span>{task.status ? "Completed" : "Pending"}</span>
                      </div>

                      <div className="flex items-center text-gray-600">
                        <Target className="w-4 h-4 mr-2" />
                        <span>
                          Due: {new Date(task.Deadline).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DisplayCards;
