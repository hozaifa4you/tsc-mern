require("dotenv").config();
import { Request, Response, NextFunction } from "express";

import { HttpException } from "../utils/HttpException";
import { NODE_ENV, ErrorType } from "./../utils/options";

export const notFound = (
   req: Request,
   res: Response,
   next: NextFunction
): Response | void => {
   const message: string =
      `The requested path was not found ` + req.originalUrl;

   return next(new HttpException(message, 404, null));
};

export const errorHandler = (
   err: HttpException,
   req: Request,
   res: Response,
   next: NextFunction
): Response => {
   let status: number = err.status || 500;
   let message: string = err.message || "Internal server error!";
   let errors: object[] = [];

   // FIXME remove in future
   console.log("Error showing".red.underline, err);
   // console.log(`Error showing name`.yellow.bold, err.name);
   // console.log(`Error showing errors keys`.red.bold, Object.keys(err.errors!));
   // console.log(
   //    `Error showing errors values`.red.bold,
   //    Object.values(err.errors!).map((pro: any) => pro?.properties)
   // );

   // HACK Validation error
   if (err.name === ErrorType.ValidationError) {
      message = "user validation failed!";
      errors = Object.values(err.errors!).map((pro: any) => pro?.properties);
      status = 400;
   }

   // HACK mongoose cast error
   if (err.name === ErrorType.CastError) {
      message = "The requested id is not valid!";
      status = 406;
   }

   // HACK duplicate error
   if (err.code === ErrorType.MongoDuplicateError) {
      const key: string[] = Object.keys(err?.keyValue!);
      const value: string[] = Object.values(err?.keyValue!);

      message = `Duplicate value entered ${key[0]} as '${value[0]}'`;
      status = 406;
   }

   return res.status(status).json({
      success: false,
      stack: process.env.NODE_ENV === NODE_ENV.DEV ? err.stack : null,
      message,
      errors: errors.length > 0 ? errors : null,
   });
};
