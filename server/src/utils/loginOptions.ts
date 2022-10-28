import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { EUsers } from "../models/User";

const jwt_secret: string = process.env.JWT_SECRET!;
const jwt_expiry: string = process.env.JWT_EXPIRY!;

export interface IJwtPayload extends JwtPayload {
   id: string;
   username: string;
   email: string;
   userType: EUsers;
}

/**
 *
 * @param payload as {JwtPayload}
 * @returns sha256 json web token
 */
export const jwtTokenGenerator = (payload: IJwtPayload): string => {
   const token = jwt.sign(payload, jwt_secret, { expiresIn: jwt_expiry });
   return token;
};

/**
 *
 * @param token that you want to verify
 * @returns decoded data as JwtPayload or string
 */
export const jwtTokenVerify = (token: string): IJwtPayload => {
   try {
      return jwt.verify(token, jwt_secret) as IJwtPayload;
   } catch (err: any) {
      throw new Error(err.message);
   }
};

/**
 *
 * @param givenPass password that you want to compare
 * @param databasePass password that hash saved in database
 * @returns Promise -> boolean
 */
export const matchedPassword = async (
   givenPass: string,
   databasePass: string
): Promise<boolean> => {
   try {
      return await bcrypt.compare(givenPass, databasePass);
   } catch (err: any) {
      throw new Error(err.message);
   }
};
