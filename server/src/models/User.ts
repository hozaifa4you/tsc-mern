import {
   Schema,
   model,
   Document,
   CallbackWithoutResultAndOptionalError,
} from "mongoose";
import bcrypt from "bcryptjs";

export enum EUsers {
   User = "user",
   Admin = "admin",
   Supervisor = "supervisor",
   Instructor = "instructor",
   Stuff = "stuff",
   Manager = "manager",
   CEO = "ceo",
   Dev = "developer",
}

export interface DocumentTypes extends Document {
   name: string;
   username: string;
   email: string;
   password: string;
   userType: EUsers;
   projects: Schema.Types.ObjectId[];
   resetPasswordToken: string;
   resetPasswordExpire: Date;
}

const emailRegx: RegExp =
   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // XXX regex validation for email

const userSchema = new Schema<DocumentTypes>(
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
      userType: { type: String, enum: EUsers, required: true },
      projects: [Schema.Types.ObjectId],
      resetPasswordToken: String, // XXX it will help you to reset password
      resetPasswordExpire: Date, // XXX password expire of token
   },
   { timestamps: true }
);

userSchema.pre(
   "save",
   async function (next: CallbackWithoutResultAndOptionalError): Promise<void> {
      const user: DocumentTypes = this as DocumentTypes;
      if (!user.isModified("password")) {
         next();
      }
      const hash = await bcrypt.hash(user.password, 12);
      user.password = hash;
      return next();
   }
);

const userModel = model<DocumentTypes>("User", userSchema);

export default userModel;
