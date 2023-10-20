import { DataTypes } from "sequelize";
import sequelize from "../core/database";

const TaskLabel = sequelize.define("task_label", {
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

export default TaskLabel;