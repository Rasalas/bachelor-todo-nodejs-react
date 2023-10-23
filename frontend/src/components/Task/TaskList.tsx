import React from "react";
import TaskEntry from "./TaskEntry";

interface TaskListProps {
  tasks: Task[];
  onSelectTask: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onSelectTask }) => {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskEntry
          key={task.id}
          task={task}
          onSelectTask={() => onSelectTask(task)}
        />
      ))}
    </ul>
  );
};

export default TaskList;
