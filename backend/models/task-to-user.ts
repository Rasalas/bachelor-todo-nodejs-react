import { DataTypes } from "sequelize";
import sequelize from "../core/database";

const TaskToUser = sequelize.define("task_to_user", {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    task_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

export default TaskToUser;