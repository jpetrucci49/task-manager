import { render, screen, fireEvent } from '@testing-library/react';
import TaskList from '../components/TaskList';

const mockLocalStorage = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => (store[key] = value),
    clear: () => (store = {}),
  };
})();

Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

describe('TaskList', () => {
  beforeEach(() => {
    mockLocalStorage.clear();
  });

  it('should render initial tasks with status, delete, edit buttons, and filter dropdown', () => {
    render(<TaskList />);
    expect(screen.getByText('Master OOP Principles (todo)')).toBeInTheDocument();
    expect(screen.getByText('Build Task Manager (in-progress)')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /To Do/i })).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: /In Progress/i })).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: /Done/i })).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: /delete/i })).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: /edit/i })).toHaveLength(2);
    expect(screen.getByRole('combobox', { name: /filter by status/i })).toBeInTheDocument();
  });

  it('should render input field and add task button', () => {
    render(<TaskList />);
    expect(screen.getByPlaceholderText(/enter task title/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
  });

  it('should add a new task when form is submitted', () => {
    render(<TaskList />);
    const input = screen.getByPlaceholderText(/enter task title/i);
    const addButton = screen.getByRole('button', { name: /add task/i });

    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(addButton);

    expect(screen.getByText('New Task (todo)')).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('should update task status when button is clicked', () => {
    render(<TaskList />);
    const taskText = 'Master OOP Principles (todo)';
    expect(screen.getByText(taskText)).toBeInTheDocument();

    const inProgressButton = screen.getAllByRole('button', { name: /In Progress/i })[0];
    fireEvent.click(inProgressButton);

    expect(screen.getByText('Master OOP Principles (in-progress)')).toBeInTheDocument();
    expect(screen.queryByText(taskText)).not.toBeInTheDocument();
  });

  it('should remove a task when delete button is clicked', () => {
    render(<TaskList />);
    const taskText = 'Master OOP Principles (todo)';
    expect(screen.getByText(taskText)).toBeInTheDocument();

    const deleteButton = screen.getAllByRole('button', { name: /delete/i })[0];
    fireEvent.click(deleteButton);

    expect(screen.queryByText(taskText)).not.toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /delete/i })).toHaveLength(1);
  });

  it('should filter tasks by status when dropdown is changed', () => {
    render(<TaskList />);
    const filterDropdown = screen.getByRole('combobox', { name: /filter by status/i });

    // Show only "todo" tasks
    fireEvent.change(filterDropdown, { target: { value: 'todo' } });
    expect(screen.getByText('Master OOP Principles (todo)')).toBeInTheDocument();
    expect(screen.queryByText('Build Task Manager (in-progress)')).not.toBeInTheDocument();

    // Show only "in-progress" tasks
    fireEvent.change(filterDropdown, { target: { value: 'in-progress' } });
    expect(screen.getByText('Build Task Manager (in-progress)')).toBeInTheDocument();
    expect(screen.queryByText('Master OOP Principles (todo)')).not.toBeInTheDocument();

    // Show all tasks
    fireEvent.change(filterDropdown, { target: { value: 'all' } });
    expect(screen.getByText('Master OOP Principles (todo)')).toBeInTheDocument();
    expect(screen.getByText('Build Task Manager (in-progress)')).toBeInTheDocument();
  });

  it('should edit a task title when edit button is clicked and saved', () => {
    render(<TaskList />);
    const taskText = 'Master OOP Principles (todo)';
    expect(screen.getByText(taskText)).toBeInTheDocument();

    const editButton = screen.getAllByRole('button', { name: /edit/i })[0];
    fireEvent.click(editButton);

    const input = screen.getByDisplayValue('Master OOP Principles');
    fireEvent.change(input, { target: { value: 'Updated Task Title' } });

    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);

    expect(screen.getByText('Updated Task Title (todo)')).toBeInTheDocument();
    expect(screen.queryByText(taskText)).not.toBeInTheDocument();
  });

  it('should persist tasks to localStorage after adding a task', () => {
    render(<TaskList />);
    const input = screen.getByPlaceholderText(/enter task title/i);
    const addButton = screen.getByRole('button', { name: /add task/i });

    fireEvent.change(input, { target: { value: 'Persisted Task' } });
    fireEvent.click(addButton);

    const storedTasks = JSON.parse(mockLocalStorage.getItem('tasks') || '[]');
    expect(storedTasks.some((task: { title: string }) => task.title === 'Persisted Task')).toBe(true);
  });

  it('should load tasks from localStorage on mount', () => {
    const tasks = [
      { id: '3', title: 'Stored Task', status: 'todo' },
      { id: '4', title: 'Another Task', status: 'done' },
    ];
    mockLocalStorage.setItem('tasks', JSON.stringify(tasks));

    render(<TaskList />);
    expect(screen.getByText('Stored Task (todo)')).toBeInTheDocument();
    expect(screen.getByText('Another Task (done)')).toBeInTheDocument();
  });
});