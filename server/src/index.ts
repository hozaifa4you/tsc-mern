import express, { Application } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import * as Colors from "colors.ts";

import { dbConnection } from "./utils/dbConnection";
import { errorHandler, notFound } from "./middleware/errorMiddleware";
import projectRoutes from "./routes/project-routes";

// config
const app: Application = express();
dotenv.config();
Colors.colors("", "");
const port = process.env.PORT! || 9090;
const mongo_uri: string = process.env.MONGODB_URI!;
const backend_origin: string = process.env.BACKEND_ORIGIN!;

// middleware
const middleware = [
   morgan("dev"),
   express.json({ limit: "30mb" }),
   express.urlencoded({ limit: "10mb", extended: false }),
];
app.use(middleware);

// endpoints
app.use("/api/v1/projects", projectRoutes);

// error handler
app.use([notFound, errorHandler]);

// listen
app.listen(port, async (): Promise<void> => {
   console.log(`Server is running on ${backend_origin}`);
   await dbConnection(mongo_uri);
});
