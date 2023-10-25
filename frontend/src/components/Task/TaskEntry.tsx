import React from "react";

interface TaskProps {
  task: Task;
  onSelectTask: (task: Task) => void;
}

const TaskEntry: React.FC<TaskProps> = ({ task, onSelectTask }) => {
  return (
    <li key={task.id} onClick={() => onSelectTask(task)}>
      {task.status?.key == 'done' ? "✅" : "❌"} {task.title}
    </li>
  );
};

export default TaskEntry;
