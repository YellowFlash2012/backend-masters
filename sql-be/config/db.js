import { Sequelize } from "sequelize"

const sequelize = new Sequelize(
    process.env.database,
    "postgres",
    process.env.password,
    {
        host: "localhost",
        dialect: "postgres",
    }
); 

try {
    await sequelize.authenticate();
    console.log("DB connection has been established successfully.".cyan.bold);

} catch (error) {
    console.error("Unable to connect to the database:", error);
}

export default sequelize