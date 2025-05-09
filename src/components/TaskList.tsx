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
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleStatusChange = (taskId: string, newStatus: string) => {
    board.moveTask(taskId, newStatus);
    const newBoard = new KanbanBoard();
    board.getTasks().forEach(task => {
      newBoard.addTask(new Task(task.id, task.title, task.status));
    });
    setBoard(newBoard);
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      const newTask = new Task(Date.now().toString(), newTaskTitle, 'todo');
      board.addTask(newTask);
      const newBoard = new KanbanBoard();
      board.getTasks().forEach(task => {
        newBoard.addTask(new Task(task.id, task.title, task.status));
      });
      setBoard(newBoard);
      setNewTaskTitle('');
    }
  };

  return (
    <div>
      <h2>Tasks</h2>
      <div>
        <input
          type="text"
          value={newTaskTitle}
          onChange={e => setNewTaskTitle(e.target.value)}
          placeholder="Enter task title"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
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