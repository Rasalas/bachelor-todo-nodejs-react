import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import tasksFromJSON from "../data/mock-tasks.json";
import TaskList from "../components/Task/TaskList";
import TaskForm from "../components/Task/TaskForm";
import Layout from "../components/Layout/Layout";

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(tasksFromJSON);
  const addTask = (newTask: Task) => {
    newTask.id = Date.now();
    if (!newTask.title) {
      return;
    }
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };
  const updateTask = (updatedTask: Task) => {
    const updatedTaskId = Number(updatedTask.id); // Konvertiere die ID in eine Zahl

    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        return task.id === updatedTaskId ? updatedTask : task;
      })
    );
  };
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const handleTaskSelection = (task: Task) => {
    setSelectedTask(task);
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <header className="col-md-12 mt-4">
              <h1>Quest Log</h1>
            </header>
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-12 ">
                <TaskList tasks={tasks} onSelectTask={handleTaskSelection} />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <TaskForm
              task={selectedTask}
              addTask={addTask}
              updateTask={updateTask}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Tasks;
