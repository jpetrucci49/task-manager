import { Task } from './Task';

export abstract class Board {
  abstract addTask(task: Task): void;
  abstract moveTask(taskId: string, newStatus: string): void;
}

export class KanbanBoard implements Board {
    private tasks: Task[] = [];
  
    addTask(task: Task): void {
      this.tasks.push(task);
    }
  
    moveTask(taskId: string, newStatus: string): void {
      const task = this.tasks.find(t => t.getDetails().id === taskId);
      if (task) {
        task.updateStatus(newStatus);
      }
    }
  
    removeTask(taskId: string): void {
      this.tasks = this.tasks.filter(t => t.getDetails().id !== taskId);
    }
  
    getTasks(): { id: string; title: string; status: string }[] {
      return this.tasks.map(task => task.getDetails());
    }
  }