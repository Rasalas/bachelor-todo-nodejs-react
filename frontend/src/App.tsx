import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// import ./data/mock-task.json and assign it to a variable named tasks

import tasks from "./data/mock-tasks.json";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

function App() {
  return (
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
              <TaskList tasks={tasks} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <TaskForm />
        </div>
      </div>
    </div>
  );
}

export default App;
