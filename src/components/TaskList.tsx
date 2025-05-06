import React, { useState } from 'react';
import { Task } from '../models/Task';
import { KanbanBoard } from '../models/KanbanBoard';

const TaskList: React.FC = () => {
  const [board] = useState<KanbanBoard>(() => {
    const board = new KanbanBoard();
    board.addTask(new Task('1', 'Master OOP Principles', 'todo'));
    board.addTask(new Task('2', 'Build Task Manager', 'in-progress'));
    return board;
  });

  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {board.getTasks().map(task => (
          <li key={task.id}>
            {task.title} ({task.status})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;