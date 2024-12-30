import { Task, CreateTaskDTO, UpdateTaskDTO } from './Task';

export interface TaskRepository {
  getAll(): Promise<Task[]>;
  getById(id: string): Promise<Task | null>;
  create(task: CreateTaskDTO): Promise<Task>;
  update(id: string, task: UpdateTaskDTO): Promise<Task | null>;
  delete(id: string): Promise<boolean>;
}

