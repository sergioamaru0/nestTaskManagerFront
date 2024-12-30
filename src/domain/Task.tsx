export interface Task {
    taskId: string;
    taskName: string;
    taskDescription?: string;
    taskStatus: boolean;
    createdAt: Date;
  }
  
  export interface CreateTaskDTO {
    taskName: string;
    taskDescription?: string;
  }
  
  export interface UpdateTaskDTO {
    taskName?: string;
    taskDescription?: string;
    taskStatus?: boolean;
  }
  