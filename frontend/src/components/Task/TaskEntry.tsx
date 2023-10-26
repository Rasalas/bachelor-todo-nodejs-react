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

  return (
    <li key={task.id} onClick={() => onSelectTask(task)}>
      {task.title}
      <button
        className="btn float-end py-0"
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
