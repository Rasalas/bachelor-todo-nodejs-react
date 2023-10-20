import { DataTypes } from "sequelize";
import sequelize from "../core/database";

const TaskToTaskLabel = sequelize.define("task_to_task_label", {
    task_label_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    task_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

export default TaskToTaskLabel;