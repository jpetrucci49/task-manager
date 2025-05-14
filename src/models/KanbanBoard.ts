import { Task } from './Task';

export abstract class Board {
  abstract addTask(task: Task): void;
  abstract moveTask(taskId: string, newStatus: string): void;
}

export class KanbanBoard implements Board {
    private tasks: Task[] = [];
  
    static fromStoredTasks(storedTasks: { id: string; title: string; status: string }[]): KanbanBoard {
      const board = new KanbanBoard();
      storedTasks.forEach(task => {
        board.addTask(new Task(task.id, task.title, task.status));
      });
      return board;
    }

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
  
    updateTaskTitle(taskId: string, newTitle: string): void {
      const task = this.tasks.find(t => t.getDetails().id === taskId);
      if (task) {
        task.updateTitle(newTitle);
      }
    }

    getTasks(): { id: string; title: string; status: string }[] {
      return this.tasks.map(task => task.getDetails());
    }
  
    getTasksByStatus(status: string): { id: string; title: string; status: string }[] {
      if (status === 'all') {
        return this.getTasks();
      }
      return this.tasks
        .filter(task => task.getDetails().status === status)
        .map(task => task.getDetails());
    }
  }