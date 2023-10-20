import { DataTypes } from "sequelize";
import sequelize from "../core/database";

const TaskActivityType = sequelize.define("task_activity_type", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    key: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

export default TaskActivityType;