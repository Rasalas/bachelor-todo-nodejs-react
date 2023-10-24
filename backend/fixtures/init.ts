// fixtures/init.ts
import sequelize from '../core/database';
import sequelize_fixtures from 'sequelize-fixtures';
import path from 'path';

import Task from '../models/task'
import Project from '../models/project';
import TaskStatus from '../models/task-status';

const models = { Task, Project, TaskStatus };

async function loadFixtures() {
    await sequelize_fixtures.loadFiles([
        path.join(__dirname, 'projects.json'),
        path.join(__dirname, 'task-statuses.json'),
        path.join(__dirname, 'tasks.json'),
    ], models);
}

loadFixtures()
    .then(() => {
        console.log('Fixtures loaded successfully');
        sequelize.close();
    })
    .catch(error => {
        console.error('Error loading fixtures:', error.message);
        sequelize.close();
    });
