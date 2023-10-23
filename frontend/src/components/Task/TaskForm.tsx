import React, { useState, useEffect } from "react";

interface TaskFormProps {
  task?: Task | null;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, addTask, updateTask }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const task = Object.fromEntries(formData.entries()) as unknown as Task;
    if (task.id) {
      task.id = Number(task.id);
      updateTask(task);
    } else {
      task.id = task.id || Date.now();
      addTask(task);
    }
    
    setId(undefined);
    setTitle("");
    setDescription("");
    setCompleted(false);
    setStatus("todo");
  };
  const [id, setId] = useState<number | undefined>(task?.id || undefined);
  const [title, setTitle] = useState<string>(task?.title || "");
  const [description, setDescription] = useState<string>(
    task?.description || ""
  );
  const [completed, setCompleted] = useState<boolean>(task?.completed || false);
  const [status, setStatus] = useState<string>(task?.status || "todo");

  useEffect(() => {
    setId(task?.id || undefined);
    setTitle(task?.title || "");
    setDescription(task?.description || "");
    setCompleted(task?.completed || false);
    setStatus(task?.status || "todo");
  }, [task]);

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={id} />
      <div className="mb-3">
        <label className="form-label" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description <small>(optional)</small>
        </label>
        <textarea
          name="description"
          id="description"
          className="form-control"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="form-check mb-3">
        <input
          type="checkbox"
          name="completed"
          id="completed"
          className="form-check-input"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="completed">
          Completed
        </label>
      </div>
      <div className="mb-3">
        <label htmlFor="status" className="form-label">
          Status
        </label>
        <select
          className="form-select"
          aria-label="Status"
          name="status"
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value={"todo"}>Todo</option>
          <option value={"backlog"}>Backlog</option>
          <option value={"waiting"}>Waiting</option>
          <option value={"review"}>Review</option>
          <option value={"done"}>Done</option>
        </select>
      </div>
      <button className="btn btn-primary">Save Quest</button>
    </form>
  );
};

export default TaskForm;
