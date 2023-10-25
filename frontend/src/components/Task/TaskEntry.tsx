import React, { useContext } from "react";
import { TaskContext } from "../../context/TaskContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'


interface TaskProps {
  task: Task;
  onSelectTask: (task: Task) => void;
}

const TaskEntry: React.FC<TaskProps> = ({ task, onSelectTask }) => {
  const { deleteTask } = useContext(TaskContext);

  return (
    <li key={task.id} onClick={() => onSelectTask(task)}>
      {task.status?.key == 'done' ? "✅" : "❌"} {task.title}
      <button className="btn float-end" onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }}><FontAwesomeIcon className="text-danger" icon={icon({name: 'trash'})} /></button>
    </li>
  );
};

export default TaskEntry;
