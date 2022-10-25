import express from "express";
import { config } from "dotenv";
import helmet from "helmet";
import morgan from "morgan"
import colors from "colors"

config()

const app = express();

const port = process.env.PORT || 8000;

app.use(express.json())
app.use(helmet())

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.listen(port, () => {
    console.log(
        `Server running in ${process.env.NODE_ENV} mode | Port ${port}`.yellow
            .bold
    );
});