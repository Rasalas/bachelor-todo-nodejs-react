import React, { createContext, useState, useEffect } from "react";
import config from "../config";

interface TaskContextProps {
  tasks: Task[];
  createTask: (newTask: Task) => void;
  updateTask: (updatedTask: Task) => void;
  deleteTask: (taskId: number) => void;
  // ... andere Funktionen ...
}

export const TaskContext = createContext<TaskContextProps>({
  tasks: [],
  createTask: (newTask: Task) => {},
  updateTask: (updatedTask: Task) => {},
  deleteTask: (taskId: number) => {},
});

interface TaskProviderProps {
  children: React.ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch(`${config.api.url}/tasks`)
      .then((response) => response.json())
      .then((data) => setTasks(data.tasks))
      .catch((error) => console.error(error));
  }, []);

  const createTask = (newTask: Task) => {
    fetch(`${config.api.url}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((data) => setTasks((prevTasks) => [...prevTasks, data]))
      .catch((error) => console.error(error));
  };

  const updateTask = (updatedTask: Task) => {
    fetch(`${config.api.url}/tasks/${updatedTask.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === updatedTask.id ? data : task))
        );
      })
      .catch((error) => console.error("Error:", error));
  };

  const deleteTask = (taskId: number) => {
    fetch(`${config.api.url}/tasks/${taskId}`, {
      method: "DELETE",
    })
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <TaskContext.Provider value={{ tasks, createTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
