import { Task, CreateTaskDTO, UpdateTaskDTO } from '../domain/Task';
import { TaskRepository } from '../domain/TaskRepository';

export class TaskService {
  constructor(private taskRepository: TaskRepository) {}

  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.getAll();
  }

  async getTaskById(id: string): Promise<Task | null> {
    return this.taskRepository.getById(id);
  }

  async createTask(task: CreateTaskDTO): Promise<Task> {
    return this.taskRepository.create(task);
  }

  async updateTask(id: string, task: UpdateTaskDTO): Promise<Task | null> {
    return this.taskRepository.update(id, task);
  }

  async deleteTask(id: string): Promise<boolean> {
    return this.taskRepository.delete(id);
  }
}

