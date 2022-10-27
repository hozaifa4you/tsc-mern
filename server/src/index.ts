import express, { Application, Express, Request } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import * as Colors from "colors.ts";

import { IJwtPayload } from "./utils/loginOptions";
import { dbConnection } from "./utils/dbConnection";
import { errorHandler, notFound } from "./middleware/errorMiddleware";
import projectRoutes from "./routes/project-routes";
import userRoutes from "./routes/user-routes";

// HACK config
const app: Application = express();
dotenv.config();
Colors.colors("", "");
const port = process.env.PORT! || 9090;
const mongo_uri: string = process.env.MONGODB_URI!;
const backend_origin: string = process.env.BACKEND_ORIGIN!;
const node_env: string = process.env.NODE_ENV!;

// TODO bind user with Express request
declare global {
   namespace Express {
      interface Request {
         user?: IJwtPayload | undefined;
      }
   }
}

// HACK middleware
const middleware = [
   morgan("dev"),
   express.json({ limit: "30mb" }),
   express.urlencoded({ limit: "10mb", extended: false }),
];
app.use(middleware);

// HACK endpoints
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/users", userRoutes);

// HACK error handler
app.use([notFound, errorHandler]);

// HACK listen
app.listen(port, async (): Promise<void> => {
   console.log(
      `Server is running on ${backend_origin}`.bg_black.cyan.underline.bold
   );
   await dbConnection(mongo_uri, node_env);
});
