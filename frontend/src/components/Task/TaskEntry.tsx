import React, { useContext } from "react";
import { TaskContext } from "../../context/TaskContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import icons from "../../utils/icons";

interface TaskProps {
  task: Task;
  onSelectTask: (task: Task) => void;
}

const TaskEntry: React.FC<TaskProps> = ({ task, onSelectTask }) => {
  const { deleteTask } = useContext(TaskContext);

  const generateClassNames = () => {
    let classes = 'me-2';  // me-2 class is always included
    if (task.status.color) {
      classes += ` text-${task.status.color}`;
    }
    return classes;
  };

  const icon = task.status.icon && icons.hasOwnProperty(task.status.icon)
               ? icons[task.status.icon as keyof typeof icons]
               : undefined;

  return (
    <li key={task.id} onClick={() => onSelectTask(task)}>
      {task.status.icon && icons[task.status.icon] ? (
        <FontAwesomeIcon className={generateClassNames()} icon={icons[task.status.icon]} />
      ) : null}
      {task.title}
      <button
        className="btn float-end"
        onClick={(e) => {
          e.stopPropagation();
          deleteTask(task.id);
        }}
      >
        <FontAwesomeIcon
          className="text-danger"
          icon={faTrash}
        />
      </button>
    </li>
  );
};

export default TaskEntry;
