import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import tasksFromJSON from "../data/mock-tasks.json";
import TaskList from "../components/Task/TaskList";
import TaskForm from "../components/Task/TaskForm";
import Layout from "../components/Layout/Layout";
import config from "../config";
import { TaskProvider } from "../context/TaskContext";

const Tasks: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const handleTaskSelection = (task: Task) => {
    setSelectedTask(task);
  };
  const handleNewButtonClick = () => {
    setSelectedTask(null);
  };

  return (
    <TaskProvider>
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <header className="col-md-12 mt-4 d-flex justify-content-between align-items-center">
                <h1>Quests</h1>
                <button
                  className="btn btn-primary"
                  onClick={handleNewButtonClick}
                >
                  + New
                </button>
              </header>
            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-12 ">
                  <TaskList onSelectTask={handleTaskSelection} />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <TaskForm task={selectedTask} />
            </div>
          </div>
        </div>
      </Layout>
    </TaskProvider>
  );
};

export default Tasks;
