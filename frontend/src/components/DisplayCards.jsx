import React from 'react'
import TaskCard from '../TaskCard';

function DisplayCards({ tasks, onStatusChange }) {
    return (
        <div className="md:w-2/3">
          <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Your Tasks</h2>
            {tasks.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No tasks yet. Add a new task to get started.</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {tasks.map(task => (
                  <TaskCard 
                    key={task.id} 
                    task={task} 
                    onStatusChange={onStatusChange}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      );
}

export default DisplayCards
