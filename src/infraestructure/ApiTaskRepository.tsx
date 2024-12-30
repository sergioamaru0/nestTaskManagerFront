import { Task, CreateTaskDTO, UpdateTaskDTO } from '../domain/Task';
import { TaskRepository } from '../domain/TaskRepository';

const API_BASE_URL = 'https://localhost:7115/api';

export class ApiTaskRepository implements TaskRepository {
  async getAll(): Promise<Task[]> {
    const response = await fetch(`${API_BASE_URL}/tasksapi`);
    if (!response.ok) throw new Error('Failed to fetch tasks');
    return response.json();
  }

  async getById(TaskId: string): Promise<Task | null> {
    const response = await fetch(`${API_BASE_URL}/tasksapi/${TaskId}`);
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error('Failed to fetch task');
    }
    return response.json();
  }

  async create(task: CreateTaskDTO): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/tasksapi`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error('Failed to create task');
    return response.json();
  }

  async update(id: string, task: UpdateTaskDTO): Promise<Task | null> {
    const response = await fetch(`${API_BASE_URL}/tasksapi/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error('Failed to update task');
    }
    return response.json();
  }

  async delete(id: string): Promise<boolean> {
    const response = await fetch(`${API_BASE_URL}/tasksapi/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      if (response.status === 404) return false;
      throw new Error('Failed to delete task');
    }
    return true;
  }
}

