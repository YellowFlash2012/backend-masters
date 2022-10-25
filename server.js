import express from "express";
import { config } from "dotenv";
import helmet from "helmet";
import morgan from "morgan"
import colors from "colors"
import bootcampRoutes from "./routes/v1/bootcamps.js";

config()

const app = express();

const port = process.env.PORT || 8000;

app.use(express.json())
app.use(helmet())


if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.get("/", (req, res) => {
    res.send("Server is live!")
})

app.use("/api/v1/bootcamps", bootcampRoutes);

app.listen(port, () => {
    console.log(
        `Server running in ${process.env.NODE_ENV} mode | Port ${port}`.yellow
            .bold
    );
});