import express from "express";
import path from "path";
import { config } from "dotenv";
import helmet from "helmet";
import morgan from "morgan"
import colors from "colors"
import fileUpload from "express-fileupload"
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize"
import xss from "xss-clean"
import rateLimit from "express-rate-limit"
import hpp from "hpp"
import cors from "cors"
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

// set security headers
app.use(helmet())
app.use(cookieParser())

// sanitize data
app.use(mongoSanitize())

// prevent xss attack
app.use(xss())

// rate limiting (1 req/10minutes)
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, //10 mins
    max:3
})
app.use(limiter)

// prevent http param pollution
app.use(hpp())

app.use(cors())

// cookie-paerser config
app.use(cookieParser)


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