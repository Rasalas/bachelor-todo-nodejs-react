import { Request, Response } from 'express';
import Task from '../models/task';
import TaskStatus from '../models/task-status';

interface ITaskStatus {
    id: number;
    name: string;
    key: string;
}

class TaskController {
    public async index(req: Request, res: Response) {
        try {
            const tasks = await Task.findAll({
                include: [{
                    model: TaskStatus,
                    as: 'status',
                    attributes: ['key'],
                }],
                attributes: {
                    exclude: ['status_id', 'project_id']
                }
            });
            res.json({ tasks: tasks });
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }

    public async show(req: Request, res: Response) {
        try {
            const task = await Task.findByPk(req.params.id);
            if (task) {
                res.json({ task: task });
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

                const taskStatus = await TaskStatus.findOne({ where: { key: req.body.status.key } }) as unknown as ITaskStatus;

                if (taskStatus) {
                    await task.update({ status_id: taskStatus.id, ...req.body }) ;
    
                    const updatedTask = await Task.findByPk(req.params.id, {
                        include: [{
                            model: TaskStatus,
                            as: 'status',
                            attributes: ['key'],
                        }],
                        attributes: {
                            exclude: ['status_id', 'project_id']
                        }
                    });
                    
                    res.json(updatedTask);
                } else {
                    res.status(404).send('Task status not found');
                }
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