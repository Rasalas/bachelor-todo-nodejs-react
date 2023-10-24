import { Request, Response } from 'express';
import Task from '../models/task';
import TaskStatus from '../models/task-status';

class TaskController {
    public async index(req: Request, res: Response) {
        try {
            const tasks = await Task.findAll({
                include: [{
                    model: TaskStatus,
                    as: 'status'
                }]
            });
            res.json({tasks: tasks});
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }

    public async show(req: Request, res: Response) {
        try {
            const task = await Task.findByPk(req.params.id);
            if (task) {
                res.json({task: task});
            } else {
                res.status(404).send('Task not found');
            }
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }

    public async create(req: Request, res: Response) {
        try {
            const task = await Task.create(req.body);
            res.status(201).json(task);
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const task = await Task.findByPk(req.params.id);
            if (task) {
                await task.update(req.body);
                res.json(task);
            } else {
                res.status(404).send('Task not found');
            }
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const task = await Task.findByPk(req.params.id);
            if (task) {
                await task.destroy();
                res.status(204).send();
            } else {
                res.status(404).send('Task not found');
            }
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }
};

export default new TaskController();