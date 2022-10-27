import { Sequelize } from "sequelize";

const sequelizeMaker = (
  database: string,
  host: string,
  username: string,
  password: string
): Sequelize => {
  return new Sequelize(database, username, password, {
    dialect: "mysql", 
    host: host,
  });
}; 

export default sequelizeMaker; 