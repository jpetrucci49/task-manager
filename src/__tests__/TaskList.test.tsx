import { render, screen, fireEvent } from '@testing-library/react';
import TaskList from '../components/TaskList';

describe('TaskList', () => {
  it('should render initial tasks with status buttons', () => {
    render(<TaskList />);
    expect(screen.getByText('Master OOP Principles (todo)')).toBeInTheDocument();
    expect(screen.getByText('Build Task Manager (in-progress)')).toBeInTheDocument();
    expect(screen.getAllByText(/To Do/i)).toHaveLength(2);
    expect(screen.getAllByText(/In Progress/i)).toHaveLength(2);
    expect(screen.getAllByText(/Done/i)).toHaveLength(2);
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
    expect(input).toHaveValue(''); // Input cleared after submission
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
});