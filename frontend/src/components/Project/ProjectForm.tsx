import React, { useState, useEffect, useContext } from "react";
import { ProjectContext } from "../../context/ProjectContext";

interface ProjectFormProps {
  project?: Project | null;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project }) => {
  const { createProject, updateProject } = useContext(ProjectContext);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const project = Object.fromEntries(
      formData.entries()
    ) as unknown as Project;

    if (project.id) {
      project.id = Number(project.id);
      updateProject(project);
    } else {
      project.id = project.id || Date.now();
      createProject(project);
    }

    setId(undefined);
    setName("");
  };

  const [id, setId] = useState<number | undefined>(project?.id || undefined);
  const [name, setName] = useState<string>(project?.name || "");

  useEffect(() => {
    setId(project?.id || undefined);
    setName(project?.name || "");
  }, [project]);

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={id} />
      <div className="mb-3">
        <label className="form-label" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <button className="btn btn-primary">Save Project</button>
    </form>
  );
};

export default ProjectForm;
