import React from 'react';
import TaskEntry from './TaskEntry';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <ul className="task-list">
      {tasks.map(task => (
        <TaskEntry
          key={task.id}
          id={task.id}
          task={task.title}
          completed={task.completed}
        />
      ))}
    </ul>
  );
}

export default TaskList;