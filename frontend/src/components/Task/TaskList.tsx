import React, { useContext } from "react";
import TaskEntry from "./TaskEntry";
import { TaskContext } from "../../context/TaskContext";
import icons from "../../utils/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface TaskListProps {
  onSelectTask: (task: Task) => void;
}

const STATUS_KEYS = {
  backlog: { name: "Backlog", icon: "warehouse", color: "secondary" },
  todo: { name: "TODO", icon: "hammer", color: "primary" },
  waiting: { name: "Waiting", icon: "hourglass-half", color: "info" },
  review: { name: "In Review", icon: "magnifying-glass", color: "warning" },
  done: { name: "Done", icon: "check", color: "success" },
  cancelled: { name: "Cancelled", icon: "ban", color: "danger" },
  noStatus: { name: "No Status", icon: "question", color: "light" },
};

const TaskList: React.FC<TaskListProps> = ({ onSelectTask }) => {
  const { tasks } = useContext(TaskContext);

  const groupedTasks = tasks.reduce((groups, task) => {
    const key = task.status ? task.status.key : "noStatus";
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(task);
    return groups;
  }, {} as { [key: string]: Task[] });

  return (
    <div className="task-list">
      {Object.keys(groupedTasks).map((statusKey) => (
        <div key={statusKey}>
          <h3 className="task-list__title"><FontAwesomeIcon
              className={`text-${STATUS_KEYS[statusKey as keyof typeof STATUS_KEYS].color} me-2`} 
              icon={icons[STATUS_KEYS[statusKey as keyof typeof STATUS_KEYS].icon]} 
            />
            {STATUS_KEYS[statusKey as keyof typeof STATUS_KEYS].name}</h3>
          <ul>
            {groupedTasks[statusKey].map((task) => (
              <TaskEntry
                key={task.id}
                task={task}
                onSelectTask={() => onSelectTask(task)}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
