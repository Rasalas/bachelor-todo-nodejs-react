import React from "react";
import ProjectEntry from "./ProjectEntry";

interface ProjectListProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onSelectProject }) => {
  return (
    <ul className="project-list">
      {projects.map((project) => (
        <ProjectEntry
          key={project.id}
          project={project}
          onSelectProject={() => onSelectProject(project)}
        />
      ))}
    </ul>
  );
};

export default ProjectList;
