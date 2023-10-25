import { DataTypes } from "sequelize";
import sequelize from "../core/database";

const Task = sequelize.define("task", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    complexity: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
    },
    project_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
    },
    status_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
});

export default Task;
