import { Request, Response } from "express";
import lodash from "lodash";

import { EUsers } from "./../models/User";
import User from "../models/User";
import { jwtTokenGenerator, matchedPassword } from "../utils/loginOptions";
import {
   createAdminACPermission,
   createCeoACPermission,
   createDepartmentHeadACPermission,
   createDevACPermission,
   createInstructorACPermission,
   createManagerACPermission,
   createStuffACPermission,
   createSupervisorACPermission,
   createUserACPermission,
   userTypeChecker,
} from "../utils/utils";

export interface IBodyType {
   name: string;
   username: string;
   email: string;
   phone: string;
   password: string;
   userType: EUsers;
}
export interface ILoginBody {
   username: string;
   password: string;
}

class UserControllers {
   // HACK login user
   /**
    * @desc login user
    * @method POST
    * @route /api/v1/users/login
    */
   async login(req: Request, res: Response): Promise<void> {
      const { username, password } = <ILoginBody>req.body;

      if (!username || !password) {
         res.status(500);
         throw new Error(
            "data not provided! please 🙏 provide user data! ☹️💕"
         );
      }

      const user = await User.findOne({
         $or: [{ username }, { email: username }, { phone: username }],
      });

      if (!user) {
         res.status(404);
         throw new Error("Invalid credentials, try again! ☹️🥵");
      }

      const match = await matchedPassword(password, user.password);
      if (!match) {
         res.status(401);
         throw new Error("Invalid credentials, try again! ☹️🥵");
      }

      const token = jwtTokenGenerator({
         id: user._id,
         username: user.username,
         email: user.email,
         userType: user.userType,
      });

      res.status(200).json({
         success: true,
         user: lodash.omit(user.toJSON(), [
            "password",
            "__v",
            "createdAt",
            "updatedAt",
         ]),
         token,
      });
   }
   // HACK create new user
   /**
    * @desc create new user
    * @method POST
    * @route /api/v1/users/
    */
   async createUser(req: Request, res: Response): Promise<void> {
      const body = <IBodyType>req.body;

      // FIXME: user creation restriction
      // let permit: boolean;
      // if (req.user) {
      //    permit = userTypeChecker(req.user, body.userType);
      // } else {
      //    throw new Error("Please login! 😔💔");
      // }

      const user = await User.create(body);

      if (!user) {
         res.status(400);
         throw new Error("user creation unsuccessful! 😔💔");
      }

      res.status(201).json({
         success: true,
         user: lodash.omit(user.toJSON(), ["password", "__v"]),
      });
   }
   // HACK get user by id
   /**
    * @desc get user by id
    * @method GET
    * @route /api/v1/users/:id
    */
   async getUserById(req: Request, res: Response): Promise<void> {
      const user = await User.findById(req.params.id);

      if (!user) {
         res.status(404);
         throw new Error("User not found! 😒💔");
      }

      res.status(200).json({
         success: true,
         user: lodash.omit(user.toJSON(), ["password", "__v"]),
      });
   }
   // HACK update user
   /**
    * @desc update a user
    * @method PUT
    * @route /api/v1/users/
    */
   async updateUser(req: Request, res: Response): Promise<void> {
      const user = await User.findById(req.params.id);

      if (!user) {
         res.status(404);
         throw new Error("User not found! 😒💔");
      }

      if (req.body.password) {
         res.status(500);
         throw new Error("You can't update password now! 😍💕");
      }

      const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
         new: true,
      });

      res.status(200).json({
         success: true,
         user: lodash.omit(updateUser?.toJSON(), ["password", "__v"]),
      });
   }
   // HACK delete user
   /**
    * @desc delete user
    * @method DELETE
    * @route /api/v1/users/
    */
   async deleteUser(req: Request, res: Response): Promise<void> {
      const user = await User.findById(req.params.id);

      if (!user) {
         res.status(404);
         throw new Error("User not found! 😒💔");
      }

      await User.findByIdAndDelete(req.params.id);

      res.status(200).json({
         success: true,
         message: "user deleted successful 🤪👋",
      });
   }
   // HACK get all users
   /**
    * @desc get all users
    * @method GET
    * @route /api/v1/users/all-users
    */
   async getUsers(req: Request, res: Response): Promise<void> {
      const users = await User.find({});

      if (!users) {
         res.status(400);
         throw new Error("No user found!");
      }

      res.status(200).json({
         success: true,
         users: users.map((user) =>
            lodash.omit(user.toJSON(), ["password", "__v"])
         ),
      });
   }

   // HACK get all users for create user  @return { _id, name, username, avatar, userType }
   /**
    * @desc get all users
    * @method GET
    * @route /api/v1/users/all-users
    */
   async getAllUserForSelect(req: Request, res: Response) {
      const users = await User.find({});

      if (!users) {
         res.status(400);
         throw new Error("No user found!");
      }

      res.status(200).json({
         success: true,
         users: users.map((user) =>
            lodash.omit(user.toJSON(), [
               "password",
               "__v",
               "email",
               "phone",
               "projects",
               "createdAt",
               "updatedAt",
               "joinedProjects",
            ])
         ),
      });
   }
}

export default new UserControllers();
