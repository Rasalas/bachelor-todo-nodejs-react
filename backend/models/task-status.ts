import { DataTypes } from "sequelize";
import sequelize from "../core/database";

const TaskStatus = sequelize.define("task_status", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    key: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default TaskStatus;