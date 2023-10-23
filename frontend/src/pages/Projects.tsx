import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import projectsFromJSON from "../data/mock-projects.json";
import ProjectList from "../components/Project/ProjectList";
import ProjectForm from "../components/Project/ProjectForm";
import Layout from "../components/Layout/Layout";

const Projects: React.FC = () => {
  const [projects, setProject] = useState<Project[]>(projectsFromJSON);
  const addProject = (newProject: Project) => {
    newProject.id = Date.now();
    if (!newProject.name) {
      return;
    }
    setProject((prevProject) => [...prevProject, newProject]);
  };
  const updateProject = (updatedProject: Project) => {
    const updatedProjectId = Number(updatedProject.id); // Konvertiere die ID in eine Zahl

    setProject((prevProject) =>
      prevProject.map((project) => {
        return project.id === updatedProjectId ? updatedProject : project;
      })
    );
  };
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const handleProjectSelection = (project: Project) => {
    setSelectedProject(project);
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <header className="col-md-12 mt-4">
              <h1>Projects</h1>
            </header>
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-12 ">
                <ProjectList
                  projects={projects}
                  onSelectProject={handleProjectSelection}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <ProjectForm
              project={selectedProject}
              addProject={addProject}
              updateProject={updateProject}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Projects;
