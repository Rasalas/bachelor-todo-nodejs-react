import React from "react";

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskFormProps {
  task?: Task;
}

const TaskForm: React.FC<TaskFormProps> = ({ task }) => {
  return (
    <form action="">
      <div className="mb-3">
        <label className="form-label" htmlFor="task">
          Title
        </label>
        <input
          type="text"
          name="task"
          id="task"
          className="form-control"
          value={task?.title}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description <small>(optional)</small>
        </label>
        <textarea name="description" id="description" className="form-control" rows={5}>{task?.description}</textarea>
      </div>
      <div className="form-check mb-3">
        <input
          type="checkbox"
          name="completed"
          id="completed"
          className="form-check-input"
          checked={task?.completed || false}
        />
        <label className="form-check-label" htmlFor="completed">
          Completed
        </label>
      </div>
      <div className="mb-3">
        <label htmlFor="status" className="form-label">
          Status
        </label>
        <select className="form-select" aria-label="Status">
          <option selected>Todo</option>
          <option value="1">Backlog</option>
          <option value="2">Waiting</option>
          <option value="3">Review</option>
          <option value="4">Done</option>
        </select>
      </div>
      <button className="btn btn-primary">Add Task</button>
    </form>
  );
};

export default TaskForm;
