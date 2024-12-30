"use client";

import { useState, useEffect } from "react";
import { Task } from "../../domain/Task";
import { TaskService } from "../../aplication/TaskServices";
import { ApiTaskRepository } from "../../infraestructure/ApiTaskRepository";
import TaskItem from "./TaskItem";
import AddTaskForm from "./AddTaskForm";

const taskService = new TaskService(new ApiTaskRepository());

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedTasks = await taskService.getAllTasks();
      setTasks(fetchedTasks || []); // Ensure we always set an array
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Error loading tasks. Please try again later.");
      setTasks([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskName: string, taskDescription: string) => {
    try {
      setError(null);
      await taskService.createTask({ taskName, taskDescription });
      await fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
      setError("Error adding task. Please try again.");
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      setError(null);
      await taskService.updateTask(id, updates);
      await fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
      setError("Error updating task. Please try again.");
    }
  };

  const deleteTask = async (id: string) => {
    try {
      setError(null);
      await taskService.deleteTask(id);
      await fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
      setError("Error deleting task. Please try again.");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.taskStatus;
    if (filter === "pending") return !task.taskStatus;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto p-4">
      <AddTaskForm onAddTask={addTask} />
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
        Lista de Tareas
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4" role="alert">
          <p>{error}</p>
        </div>
      )}

      <div className="flex justify-center items-center my-4">
        <label className="text-gray-700 font-medium">
          Filtrar:
        </label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as "all" | "completed" | "pending")}
          className="border rounded-lg p-2 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">Todas</option>
          <option value="completed">Completadas</option>
          <option value="pending">Pendientes</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-4">Cargando tareas...</div>
      ) : (
        <ul className="space-y-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskItem
                key={task.taskId}
                task={task}
                onUpdateTask={updateTask}
                onDeleteTask={deleteTask}
              />
            ))
          ) : (
            <li className="text-center py-4 text-gray-500">
              No hay tareas {filter !== 'all' ? 'en este filtro' : ''}
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

