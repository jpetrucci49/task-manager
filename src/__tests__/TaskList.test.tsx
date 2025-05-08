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

  it('should update task status when button is clicked', () => {
    render(<TaskList />);
    const taskText = 'Master OOP Principles (todo)';
    expect(screen.getByText(taskText)).toBeInTheDocument();

    const inProgressButtons = screen.getAllByText(/In Progress/i);
    const inProgressButton = inProgressButtons[0];
    fireEvent.click(inProgressButton);

    expect(screen.getByText('Master OOP Principles (in-progress)')).toBeInTheDocument();
    expect(screen.queryByText(taskText)).not.toBeInTheDocument();
  });
});