import React, { useContext } from "react";
import TaskEntry from "./TaskEntry";
import { TaskContext } from "../../context/TaskContext";
import icons from "../../utils/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

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
  const { tasks, updateTask } = useContext(TaskContext);

  const groupedTasks = tasks.reduce((groups, task) => {
    const key = task.status ? task.status.key : "noStatus";
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(task);
    return groups;
  }, {} as { [key: string]: Task[] });

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    const start = groupedTasks[source.droppableId];
    const finish = groupedTasks[destination.droppableId];
    const task = start[source.index];

    if (start !== finish) {
      // Nur wenn die Gruppe geändert wurde
      task.status = { key: destination.droppableId }; // Status aktualisieren
      updateTask(task); // Statusänderung an das Backend senden
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="task-list">
        {Object.keys(STATUS_KEYS).map((statusKey) => (
          <Droppable droppableId={statusKey} key={statusKey}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <h3 className="task-list__title text-secondary">
                  <FontAwesomeIcon
                    className={`text-${STATUS_KEYS[statusKey as keyof typeof STATUS_KEYS].color} me-2`} 
                    icon={icons[STATUS_KEYS[statusKey as keyof typeof STATUS_KEYS].icon]} 
                  />
                  {STATUS_KEYS[statusKey as keyof typeof STATUS_KEYS].name}
                </h3>
                <ul>
                  {groupedTasks[statusKey]?.map((task, index) => (
                    <Draggable
                      draggableId={task.id.toString()}
                      index={index}
                      key={task.id}
                    >
                      {(provided) => (
                        <div 
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskEntry
                            task={task}
                            onSelectTask={() => onSelectTask(task)}
                          />
                        </div>
                      )}
                    </Draggable>
                  )) || []}
                  {provided.placeholder}
                </ul>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
  
};

export default TaskList;
