import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import projectsFromJSON from "../data/mock-projects.json";
import ProjectList from "../components/Project/ProjectList";
import ProjectForm from "../components/Project/ProjectForm";
import Layout from "../components/Layout/Layout";
import { ProjectProvider } from "../context/ProjectContext";

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const handleProjectSelection = (project: Project) => {
    setSelectedProject(project);
  };

  return (
    <ProjectProvider>
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
                  <ProjectList onSelectProject={handleProjectSelection} />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <ProjectForm project={selectedProject} />
            </div>
          </div>
        </div>
      </Layout>
    </ProjectProvider>
  );
};

export default Projects;
