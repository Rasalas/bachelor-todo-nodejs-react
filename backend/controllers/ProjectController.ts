import { Request, Response } from 'express';
import Project from '../models/project';

interface IProjectStatus {
    id: number;
    name: string;
    key: string;
}

interface IProject {
    id: number;
}

class ProjectController {
    public async index(req: Request, res: Response) {
        try {
            const projects = await Project.findAll();
            res.json({ projects: projects });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async show(req: Request, res: Response) {
        try {
            const project = await Project.findByPk(req.params.id);
            if (project) {
                res.json({ project: project });
            } else {
                res.status(404).json({ error: 'Project not found' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async create(req: Request, res: Response) {
        try {
            if (req.body.id) req.body.id = null;

            const project = await Project.create(req.body) as unknown as IProject;
            if ('id' in project) {
                const newProject = await Project.findByPk(project.id);
                res.status(201).json(newProject);
            } else {
                res.status(500).json({ error: 'Error creating project' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const project = await Project.findByPk(req.params.id);

            if (project) {
                await project.update(req.body, { fields: Object.keys(req.body) }); 
                const updatedProject = await Project.findByPk(req.params.id);
               res.status(200).json(updatedProject);
            } else {
                res.status(404).json({ error: 'Project not found' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const project = await Project.findByPk(req.params.id);
            if (project) {
                await project.destroy();
                res.status(204).json({ message: 'Project deleted' });
            } else {
                res.status(404).json({ error: 'Project not found' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
};

export default new ProjectController();