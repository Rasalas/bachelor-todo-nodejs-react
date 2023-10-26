import { Request, Response } from 'express';
import Task from '../models/task';
import TaskStatus from '../models/task-status';

interface ITaskStatus {
    id: number;
    name: string;
    key: string;
}

interface ITask {
    id: number;
}

class TaskController {
    public async index(req: Request, res: Response) {
        try {
            const tasks = await Task.findAll({
                include: [{
                    model: TaskStatus,
                    as: 'status',
                    attributes: ['key', 'icon', 'color'],
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
            const task = await Task.findByPk(req.params.id, {
                include: [{
                    model: TaskStatus,
                    as: 'status',
                    attributes: ['key', 'icon', 'color'],
                }],
                attributes: {
                    exclude: ['status_id', 'project_id']
                }
            });
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
            if (req.body.id) req.body.id = null;

            const task = await Task.create(req.body) as unknown as ITask;
            if ('id' in task) {
                const newTask = await Task.findByPk(task.id, {
                    include: [{
                        model: TaskStatus,
                        as: 'status',
                        attributes: ['key', 'icon', 'color'],
                    }],
                    attributes: {
                        exclude: ['status_id', 'project_id']
                    }
                });
                res.status(201).json(newTask);
            } else {
                res.status(500).send('Error creating task');
            }
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
                    req.body.status_id = taskStatus.id;
                    await task.update(req.body, { fields: Object.keys(req.body) });

                    const updatedTask = await Task.findByPk(req.params.id, {
                        include: [{
                            model: TaskStatus,
                            as: 'status',
                            attributes: ['key', 'icon', 'color'],
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