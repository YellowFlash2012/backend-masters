import express from "express"
import { config } from "dotenv"
import colors from "colors"
import morgan from "morgan"
import helmet from "helmet"


import bootcampRoutes from "./routes/v1/bootcamps.js";
import DBConnect from "./config/db.js"


config()

const app = express();
app.use(express.json())
app.use(helmet())

const port = process.env.PORT || 8000;

// dev logging middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
    
}

// routes
app.use("/sql-api/v1/bootcamps", bootcampRoutes)



DBConnect;
app.listen(port, () => {
    console.log(
        `Server running in ${process.env.NODE_ENV} mode | Port ${port}`.yellow
            .bold
    );
})