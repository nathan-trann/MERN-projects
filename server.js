import dotenv from "dotenv";
import "express-async-errors";
dotenv.config();

// express
import express from "express";
const app = express();

// packages
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
// database
import connectDB from "./db/connect.js";

// routers
import authRouter from "./routes/authRoutes.js";
import shortUrlRouter from "./routes/linkRoutes.js";
import getSingleRouter from "./routes/redirectRoutes.js";

// middleware
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFoundMiddleware from "./middleware/not-found.js";
import { authenticateUser } from "./middleware/authentication.js";

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(path.resolve(__dirname, "client/build", "index.html"));
app.use(express.static(path.resolve(__dirname, "client/build")));

app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(cookieParser(process.env.JWT_SECRET));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1", authenticateUser, shortUrlRouter);
app.use("/", getSingleRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
