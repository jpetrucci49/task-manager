import { KanbanBoard } from '../models/KanbanBoard';
import { Task } from '../models/Task';

describe('KanbanBoard', () => {
  let board: KanbanBoard;
  let task1: Task;
  let task2: Task;

  beforeEach(() => {
    board = new KanbanBoard();
    task1 = new Task('1', 'Task 1', 'todo');
    task2 = new Task('2', 'Task 2', 'in-progress');
  });

  it('should add a task to the board', () => {
    board.addTask(task1);
    expect(board.getTasks()).toHaveLength(1);
    expect(board.getTasks()[0]).toEqual(task1.getDetails());
  });

  it('should add multiple tasks', () => {
    board.addTask(task1);
    board.addTask(task2);
    expect(board.getTasks()).toHaveLength(2);
    expect(board.getTasks()).toContainEqual(task1.getDetails());
    expect(board.getTasks()).toContainEqual(task2.getDetails());
  });

  it('should move a task to a new status', () => {
    board.addTask(task1);
    board.moveTask('1', 'done');
    expect(board.getTasks()[0].status).toBe('done');
  });

  it('should not change status if task ID not found', () => {
    board.addTask(task1);
    board.moveTask('999', 'done');
    expect(board.getTasks()[0].status).toBe('todo');
  });

  it('should return an empty task list initially', () => {
    expect(board.getTasks()).toEqual([]);
  });

  it('should update task status and reflect in getTasks', () => {
    board.addTask(task1);
    board.moveTask('1', 'in-progress');
    expect(board.getTasks()[0].status).toBe('in-progress');
    board.moveTask('1', 'done');
    expect(board.getTasks()[0].status).toBe('done');
  });

  it('should add new tasks with unique IDs', () => {
    board.addTask(new Task('3', 'New Task', 'todo'));
    board.addTask(new Task('4', 'Another Task', 'todo'));
    expect(board.getTasks()).toHaveLength(2);
    expect(board.getTasks()[0].id).toBe('3');
    expect(board.getTasks()[1].id).toBe('4');
  });

  it('should remove a task by ID', () => {
    board.addTask(task1);
    board.addTask(task2);
    board.removeTask('1');
    expect(board.getTasks()).toHaveLength(1);
    expect(board.getTasks()[0].id).toBe('2');
  });

  it('should filter tasks by status', () => {
    board.addTask(task1); // todo
    board.addTask(task2); // in-progress
    board.addTask(new Task('3', 'Task 3', 'done'));

    expect(board.getTasksByStatus('todo')).toHaveLength(1);
    expect(board.getTasksByStatus('todo')[0].id).toBe('1');
    expect(board.getTasksByStatus('in-progress')).toHaveLength(1);
    expect(board.getTasksByStatus('in-progress')[0].id).toBe('2');
    expect(board.getTasksByStatus('done')).toHaveLength(1);
    expect(board.getTasksByStatus('done')[0].id).toBe('3');
    expect(board.getTasksByStatus('all')).toHaveLength(3);
  });
});