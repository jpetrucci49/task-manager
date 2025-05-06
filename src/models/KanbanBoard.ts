import { Task } from './Task';

export abstract class Board {
  abstract addTask(task: Task): void;
  abstract moveTask(taskId: string, newStatus: string): void;
}

export class KanbanBoard extends Board {
  private tasks: Task[] = [];

  addTask(task: Task) {
    this.tasks.push(task);
  }

  moveTask(taskId: string, newStatus: string) {
    const task = this.tasks.find(t => t.getDetails().id === taskId);
    if (task) task.updateStatus(newStatus);
  }

  getTasks() {
    return this.tasks.map(task => task.getDetails());
  }
}