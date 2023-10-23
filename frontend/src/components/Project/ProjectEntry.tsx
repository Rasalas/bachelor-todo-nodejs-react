import React from "react";

interface ProjectProps {
  project: Project;
  onSelectProject: (project: Project) => void;
}

const ProjectEntry: React.FC<ProjectProps> = ({ project, onSelectProject }) => {
  return (
    <li key={project.id} onClick={() => onSelectProject(project)}>
      {project.name}
    </li>
  );
};

export default ProjectEntry;
