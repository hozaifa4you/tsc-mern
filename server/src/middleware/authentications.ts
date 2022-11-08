import { Request, Response, NextFunction } from "express";

import User, { DocumentTypes, EUsers } from "../models/User";
import { jwtTokenVerify, IJwtPayload } from "../utils/loginOptions";

export interface ISetRequestType extends Request {
   user: IJwtPayload;
}

/**
 * @description User check the user present or not!
 * @param req Request from Express
 * @param res Response from Express
 * @param next NextFunction from Express
 * @requires Promise -> void
 */
export const authentication = async (
   req: Request,
   res: Response,
   next: NextFunction
): Promise<Response | any> => {
   const headers: string | undefined = req.headers.authorization;

   if (!req.headers || !headers || !headers.startsWith("Bearer ")) {
      res.status(401);
      throw new Error("unauthorized request! 😒😡");
   }

   const token: string = headers.split(" ")[1];
   const decoded: IJwtPayload = jwtTokenVerify(token);
   const user: DocumentTypes | null = await User.findById(decoded.id);

   if (!user) {
      res.status(404);
      throw new Error("user not found!! try again 🥵😒");
   }

   req.user = decoded;
   return next();
};

// XXX Raw permission check
export const createPermission = async (
   req: Request,
   res: Response,
   next: NextFunction
): Promise<void> => {
   const user = req.user;
   if (
      user?.userType === EUsers.CEO ||
      user?.userType === EUsers.Manager ||
      user?.userType === EUsers.DepartmentHead ||
      user?.userType === EUsers.Admin ||
      user?.userType === EUsers.Dev ||
      user?.userType === EUsers.Supervisor
   )
      return next();
   else throw new Error("Your are not granted to doing the task!");
};
