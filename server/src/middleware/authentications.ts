import { Request, Response, NextFunction } from "express";

import User, { DocumentTypes } from "../models/User";
import { jwtTokenVerify, IJwtPayload } from "../utils/loginOptions";

export interface ISetRequestType extends Request {
   user: IJwtPayload;
}

/**
 *
 * @param req Request from Express
 * @param res Response from Express
 * @param next NextFunction from Express
 * @requires Promise -> void
 */
export const authentication = async (
   req: ISetRequestType,
   res: Response,
   next: NextFunction
): Promise<void> => {
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
   next();
};
