import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Tasks from "./pages/Tasks";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Tasks />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/tasks/:id" element={<Tasks />} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
};

export default App;
