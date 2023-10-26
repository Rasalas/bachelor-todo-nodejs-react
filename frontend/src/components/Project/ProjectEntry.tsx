import React, { useContext } from "react";
import { ProjectContext } from "../../context/ProjectContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

interface ProjectProps {
  project: Project;
  onSelectProject: (project: Project) => void;
}

const ProjectEntry: React.FC<ProjectProps> = ({ project, onSelectProject }) => {
  const { deleteProject } = useContext(ProjectContext);

  return (
    <li key={project.id} onClick={() => onSelectProject(project)}>
      {project.name}
      <button
        className="btn float-end"
        onClick={(e) => {
          e.stopPropagation();
          deleteProject(project.id);
        }}
      >
        <FontAwesomeIcon
          className="text-danger"
          icon={icon({ name: "trash" })}
        />
      </button>
    </li>
  );
};

export default ProjectEntry;
