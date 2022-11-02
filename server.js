import express from "express";
import path from "path";
import { config } from "dotenv";
import helmet from "helmet";
import morgan from "morgan"
import colors from "colors"
import fileUpload from "express-fileupload"
import cookieParser from "cookie-parser";


import bootcampRoutes from "./routes/v1/bootcamps.js";
import courseRoutes from "./routes/v1/courses.js";
import userRoutes from "./routes/v1/users.js";
import reviewRoutes from "./routes/v1/reviews.js";

import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middlewares/error.js";


config()

const app = express();

const port = process.env.PORT || 8000;

app.use(express.json())
app.use(helmet())
app.use(cookieParser())

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(
    fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
    })
);

// set static folder
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')))

app.get("/", (req, res) => {
    res.send("Server is live!")
})

app.use("/api/v1/bootcamps", bootcampRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/reviews", reviewRoutes);

app.use(notFound)
app.use(errorHandler)

connectDB()
app.listen(port, () => {
    console.log(
        `Server running in ${process.env.NODE_ENV} mode | Port ${port}`.yellow
            .bold
    );
});