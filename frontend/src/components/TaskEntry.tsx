import React from "react";

interface TaskProps {
  task: Task;
  onSelectTask: (task: Task) => void;
}

const TaskEntry: React.FC<TaskProps> = ({ task, onSelectTask }) => {
  return (
    <li key={task.id} onClick={() => onSelectTask(task)}>
      {task.completed ? "✅" : "❌"} {task.title}
    </li>
  );
};

export default TaskEntry;
