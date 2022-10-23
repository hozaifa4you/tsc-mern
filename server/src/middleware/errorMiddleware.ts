require("dotenv").config();
import { Request, Response, NextFunction } from "express";

import { HttpException } from "../utils/HttpException";
import { NODE_ENV } from "./../utils/options";

console.log();

export const notFound = (req: Request, res: Response, next: NextFunction) => {
   const message: string =
      `The requested path was not found ` + req.originalUrl;

   return next(new HttpException(message, 404, null));
};

export const errorHandler = (
   err: HttpException,
   req: Request,
   res: Response,
   next: NextFunction
) => {
   const status: number = err.status || 500;
   const message: string = err.message || "Internal server error!";

   res.status(status).json({
      success: false,
      stack: process.env.NODE_ENV === NODE_ENV.DEV ? err.stack : null,
      message,
   });
};
