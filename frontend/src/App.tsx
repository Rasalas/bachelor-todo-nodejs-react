import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Tasks from "./pages/Tasks";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Projects from "./pages/Projects";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Tasks />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:id" element={<Projects />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/tasks/:id" element={<Tasks />} />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
};

export default App;
