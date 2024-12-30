'use client';

import { useState } from 'react';
import { Task } from '../../domain/Task';

type TaskItemProps = {
  task: Task;
  onUpdateTask: (id: string, updates: Partial<Task>) => void;
  onDeleteTask: (id: string) => void;
};

export default function TaskItem({ task, onUpdateTask, onDeleteTask }: TaskItemProps) {
  // Add error handling for undefined task
  if (!task) {
    return <li className="bg-white shadow-lg rounded-lg p-4">Error: Task not found</li>;
  }

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.taskName);
  const [editedDescription, setEditedDescription] = useState(task.taskDescription || '');

  const handleUpdate = () => {
    onUpdateTask(task.taskId, { taskName: editedTitle, taskDescription: editedDescription, taskStatus: task.taskStatus });
    setIsEditing(false);
  };

  const toggleComplete = () => {
    onUpdateTask(task.taskId, { taskName: task.taskName, taskDescription: task.taskDescription, taskStatus: !task.taskStatus });
  };

  return (
    <li className="bg-white shadow-lg rounded-lg p-4 transition-all hover:shadow-xl">
      {isEditing ? (
        <div className="space-y-2">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Guardar
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <div>
            <h3
              className={`text-lg font-semibold ${
                task.taskStatus ? 'line-through text-gray-500' : 'text-gray-900'
              }`}
            >
              {task.taskName}
            </h3>
            {task.taskDescription && (
              <p className="text-gray-600 mt-1">{task.taskDescription}</p>
            )}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={toggleComplete}
              className={`px-4 py-2 rounded-lg transition-colors ${
                task.taskStatus 
                  ? 'bg-green-500 text-white hover:bg-green-600' 
                  : 'bg-yellow-500 text-white hover:bg-yellow-600'
              }`}
            >
              {task.taskStatus ? 'Completada' : 'Pendiente'}
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-500 hover:text-blue-600 px-3 py-2"
            >
              Editar
            </button>
            <button
              onClick={() => onDeleteTask(task.taskId)}
              className="text-red-500 hover:text-red-600 px-3 py-2"
            >
              Eliminar
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

