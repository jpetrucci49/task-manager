import React, { useState } from 'react';
import { Task } from '../models/Task';
import { KanbanBoard } from '../models/KanbanBoard';

const TaskList: React.FC = () => {
  const [board, setBoard] = useState<KanbanBoard>(() => {
    const board = new KanbanBoard();
    board.addTask(new Task('1', 'Master OOP Principles', 'todo'));
    board.addTask(new Task('2', 'Build Task Manager', 'in-progress'));
    return board;
  });

  const handleStatusChange = (taskId: string, newStatus: string) => {
    board.moveTask(taskId, newStatus);
    // Create a new KanbanBoard instance with updated tasks
    const newBoard = new KanbanBoard();
    board.getTasks().forEach(task => {
      newBoard.addTask(new Task(task.id, task.title, task.status));
    });
    setBoard(newBoard); // Trigger re-render with new instance
  };

  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {board.getTasks().map(task => (
          <li key={task.id}>
            {task.title} ({task.status})
            <div>
              <button
                onClick={() => handleStatusChange(task.id, 'todo')}
                disabled={task.status === 'todo'}
              >
                To Do
              </button>
              <button
                onClick={() => handleStatusChange(task.id, 'in-progress')}
                disabled={task.status === 'in-progress'}
              >
                In Progress
              </button>
              <button
                onClick={() => handleStatusChange(task.id, 'done')}
                disabled={task.status === 'done'}
              >
                Done
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;