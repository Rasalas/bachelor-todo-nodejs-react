import React, {useContext} from "react";
import TaskEntry from "./TaskEntry";
import { TaskContext } from "../../context/TaskContext";

interface TaskListProps {
  onSelectTask: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({onSelectTask }) => {
  const {tasks} = useContext(TaskContext);
  console.log(tasks);
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
