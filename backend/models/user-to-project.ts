import { DataTypes } from "sequelize";
import sequelize from "../core/database";

const UserToProject = sequelize.define("user_to_project", {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

export default UserToProject;