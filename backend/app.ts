import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import User from './models/user';
import Project from './models/project';
import UserToProject from './models/user-to-project';
import TaskLabel from './models/task-label';
import TaskToTaskLabel from './models/task-to-task-label';
import Task from './models/task';
import TaskToUser from './models/task-to-user';
import TaskStatus from './models/task-status';
import TaskActivity from './models/task-activity';
import TaskActivityType from './models/task-activity-type';
import sequelize from './core/database';
import cors from 'cors';

/**
 * Routes
 */
import taskRoutes from './routes/tasks';
import projectRoutes from './routes/projects';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

User.belongsToMany(Project, { through: UserToProject, foreignKey: 'user_id' });
Project.belongsToMany(User, { through: UserToProject, foreignKey: 'project_id' });

User.belongsToMany(Task, { through: TaskToUser, foreignKey: 'user_id' });
Task.belongsToMany(User, { through: TaskToUser, foreignKey: 'task_id' });

Task.belongsToMany(TaskLabel, { through: TaskToTaskLabel, foreignKey: 'task_id' });
TaskLabel.belongsToMany(Task, { through: TaskToTaskLabel, foreignKey: 'task_label_id' });

TaskStatus.hasMany(Task, { foreignKey: 'status_id' });
Task.belongsTo(TaskStatus, { foreignKey: 'status_id', as: 'status'});

Task.belongsTo(Project, { foreignKey: 'project_id' });
Project.hasMany(Task, { foreignKey: 'project_id'});

TaskActivity.belongsTo(Task, { foreignKey: 'task_id' });
Task.hasMany(TaskActivity, { foreignKey: 'task_id' });

TaskActivity.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(TaskActivity, { foreignKey: 'user_id' });

TaskActivityType.hasMany(TaskActivity, { foreignKey: 'type_id' });
TaskActivity.belongsTo(TaskActivityType, { foreignKey: 'type_id' });

app.use('/api/v1/tasks',taskRoutes);
app.use('/api/v1/projects',projectRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hallo vom Backend!');
});

sequelize
  //.sync({ force: true }) // resets the database
  .sync()
  .then(() => {
    console.log('Datenbank bereit!');
    // Starte den Express-Server, nachdem die Tabellen erstellt wurden
    app.listen(port, () => {
      console.log(`Backend läuft auf http://localhost:${port}`);
    });
  });
