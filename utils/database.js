import Sequelize from "sequelize";

const sequelize = new Sequelize({
  username: "root",
  password: "goldtree9",
  database: "social_network",
  dialect: "mysql"
});

export default sequelize;
