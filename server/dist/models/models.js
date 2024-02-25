import { DataTypes } from "sequelize";
import sequelize from "../db.js";
const Users = sequelize.define("Users", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
});
const Roles = sequelize.define("Roles", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    value: { type: DataTypes.STRING, unique: true, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
});
const Token = sequelize.define("Token", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    refreshToken: { type: DataTypes.STRING, unique: true, allowNull: false },
});
const UserRoles = sequelize.define("UserRoles", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});
const Projects = sequelize.define("Projects", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
});
const Tasks = sequelize.define("Projects", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    dueDate: { type: DataTypes.DATE },
    file: { type: DataTypes.STRING },
});
const Statuses = sequelize.define("UserRoles", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});
const Priorities = sequelize.define("Priorities", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});
// Roles.hasMany(UserRoles);
// UserRoles.belongsTo(Roles);
export { Users, Roles, UserRoles, Projects, Tasks, Statuses, Priorities };
