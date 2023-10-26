import React, { useContext } from "react";
import ProjectEntry from "./ProjectEntry";
import { ProjectContext } from "../../context/ProjectContext";

interface ProjectListProps {
  onSelectProject: (project: Project) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ onSelectProject }) => {
  const { projects } = useContext(ProjectContext);
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
