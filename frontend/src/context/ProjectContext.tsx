import React, { createContext, useState, useEffect } from "react";
import config from "../config";

interface ProjectContextProps {
  projects: Project[];
  createProject: (newProject: Project) => void;
  updateProject: (updatedProject: Project) => void;
  deleteProject: (projectId: number) => void;
}

export const ProjectContext = createContext<ProjectContextProps>({
  projects: [],
  createProject: (newProject: Project) => {},
  updateProject: (updatedProject: Project) => {},
  deleteProject: (projectId: number) => {},
});

interface ProjectProviderProps {
  children: React.ReactNode;
}

export const ProjectProvider: React.FC<ProjectProviderProps> = ({
  children,
}) => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch(`${config.api.url}/projects`)
      .then((response) => response.json())
      .then((data) => setProjects(data.projects))
      .catch((error) => console.error(error));
  }, []);

  const createProject = (newProject: Project) => {
    fetch(`${config.api.url}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProject),
    })
      .then((response) => response.json())
      .then((data) => setProjects((prevProjects) => [...prevProjects, data]))
      .catch((error) => console.error(error));
  };

  const updateProject = (updatedProject: Project) => {
    fetch(`${config.api.url}/projects/${updatedProject.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProject),
    })
      .then((response) => response.json())
      .then((data) => {
        setProjects((prevProjects) =>
          prevProjects.map((project) =>
            project.id === updatedProject.id ? data : project
          )
        );
      })
      .catch((error) => console.error("Error:", error));
  };

  const deleteProject = (projectId: number) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;
    fetch(`${config.api.url}/projects/${projectId}`, {
      method: "DELETE",
    })
      .then(() => {
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project.id !== projectId)
        );
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <ProjectContext.Provider
      value={{ projects, createProject, updateProject, deleteProject }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
