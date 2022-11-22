import { Schema, model, Document } from "mongoose";

interface IProjectStatus {
   start: Date;
   end: Date;
   status: EStatus;
}

interface ISuggestions {
   user: Schema.Types.ObjectId;
   date: Date;
   comment: string;
}

export enum ECategories {
   WebDevelopment = "web-development",
   WebDesign = "web-design",
   FullStackApp = "full-stack-app",
   FrontendApp = "frontend-app",
   BackendApp = "backend-app",
   NodeJs = "node-js",
   ReactJs = "react-js",
   Others = "others",
}

export enum EStatus {
   UpComing = "up coming",
   Progressing = "progressing",
   End = "end",
   Cancel = "cancel",
   Rejected = "rejected",
}

enum ProjectType {
   Public = "Public",
   Closed = "Closed",
   Secret = "Secret",
   Private = "Private",
}

export interface IDocument extends Document {
   title: string;
   creator: Schema.Types.ObjectId;
   projectManager: Schema.Types.ObjectId;
   desc: string;
   photos: string[]; // done
   instructor: Schema.Types.ObjectId;
   joined: Schema.Types.ObjectId[];
   status: IProjectStatus;
   category: ECategories; // done
   love: Schema.Types.ObjectId[];
   suggestion: ISuggestions[];
   projectType: ProjectType; // done
   slug: string;
   readTime: number;
}

const projectSchema = new Schema<IDocument>(
   {
      creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
      projectManager: {
         type: Schema.Types.ObjectId,
         required: true,
         ref: "User",
      },
      title: { type: String, required: true, unique: true },
      desc: { type: String, required: true, trim: true },
      category: { type: String, enum: ECategories, required: true },
      photos: { type: [String], trim: true, default: ["project.png"] },
      instructor: { type: Schema.Types.ObjectId, ref: "User" },
      joined: { type: [Schema.Types.ObjectId], ref: "User" },
      status: {
         start: Date,
         end: Date,
         status: { type: String, required: true, enum: EStatus },
      },
      love: { type: [Schema.Types.ObjectId], ref: "User" },
      suggestion: [
         {
            user: { type: Schema.Types.ObjectId, ref: "User" },
            date: Date,
            comment: String,
         },
      ],
      projectType: { type: String, required: true, enum: ProjectType },
      slug: { type: String, required: true, unique: true, trim: true },
      readTime: { type: Number, required: true, default: 0 },
   },
   { timestamps: true }
);

export default model<IDocument>("Project", projectSchema);
