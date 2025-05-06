import { Task } from '../models/Task';

describe('Task', () => {
  let task: Task;

  beforeEach(() => {
    task = new Task('1', 'Test Task', 'todo');
  });

  it('should create a task with correct details', () => {
    expect(task.getDetails()).toEqual({
      id: '1',
      title: 'Test Task',
      status: 'todo',
    });
  });

  it('should use default status "todo" if none provided', () => {
    const noStatusTask = new Task('2', 'No Status Task');
    expect(noStatusTask.getDetails().status).toBe('todo');
  });

  it('should update task status', () => {
    task.updateStatus('in-progress');
    expect(task.getDetails().status).toBe('in-progress');
  });

  it('should only expose public methods in interface', () => {
    // Verify that public methods exist and are functions
    expect(task).toHaveProperty('getDetails');
    expect(typeof task.getDetails).toBe('function');
    expect(task).toHaveProperty('updateStatus');
    expect(typeof task.updateStatus).toBe('function');

    // Confirm no private fields are exposed as properties
    const taskKeys = Object.keys(task);
    expect(taskKeys).toEqual([]); // No own properties, as expected

    // Confirm getDetails returns only intended properties
    const details = task.getDetails();
    expect(Object.keys(details)).toEqual(['id', 'title', 'status']);
  });
});