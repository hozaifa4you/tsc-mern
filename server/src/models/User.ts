import { Schema, model, Document } from "mongoose";

export interface UserType {
   name: string;
   username: string;
   email: string;
   password: string;
   isAdmin: boolean;
   resetPasswordToken: string;
   resetPasswordExpire: Date;
}

export interface IUserSchema extends UserType {
   _id: Schema.Types.ObjectId;
   createdAt?: Date;
   updatedAt?: Date;
   __v?: number;
}

const emailRegx: RegExp =
   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // XXX regex validation for email

const userSchema = new Schema<UserType>(
   {
      name: {
         type: String,
         required: [true, "name is required! 😡👎"],
         unique: false,
         trim: true,
      },
      username: {
         type: String,
         required: [true, "username is required! 😡👎"],
         unique: true,
         trim: true,
      },
      email: {
         type: String,
         required: [true, "Email is required! 😡👎"],
         unique: true,
         trim: true,
         match: [emailRegx, "please add a valid email! 😒👎"],
      },
      password: {
         type: String,
         required: [true, "Password is required! 😡👎"],
         unique: true,
         trim: true,
         min: [8, "password minimum at least 8 character! 😕😕"],
         max: [32, "password must not longer than 32 character! 😕😕"],
      },
      isAdmin: { type: Boolean, required: true, default: false },
      resetPasswordToken: String, // XXX it will help you to reset password
      resetPasswordExpire: Date, // XXX password expire of token
   },
   { timestamps: true }
);

const userModel = model<IUserSchema>("User", userSchema);

export default userModel;
