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
   UpComing = "UpComing",
   Progressing = "progressing",
   End = "end",
   Cancel = "cancel",
   Rejected = "rejected",
}

export interface IDocument extends Document {
   title: string;
   creator: Schema.Types.ObjectId;
   projectManager: Schema.Types.ObjectId;
   desc: string;
   photos: string[];
   instructors: Schema.Types.ObjectId[];
   joined: Schema.Types.ObjectId[];
   status: IProjectStatus;
   category: ECategories;
   love: Schema.Types.ObjectId[];
   suggestion: ISuggestions[];
}

const projectSchema = new Schema<IDocument>(
   {
      creator: { type: Schema.Types.ObjectId, required: true },
      projectManager: { type: Schema.Types.ObjectId, required: true },
      title: { type: String, required: true, unique: true },
      desc: { type: String, required: true, trim: true },
      category: { type: String, enum: ECategories, required: true },
      photos: { type: [String], trim: true, default: ["project.png"] },
      instructors: { type: [Schema.Types.ObjectId] },
      joined: [Schema.Types.ObjectId],
      status: {
         start: Date,
         end: Date,
         status: { type: String, required: true, enum: EStatus },
      },
      love: [Schema.Types.ObjectId],
      suggestion: [
         { user: Schema.Types.ObjectId, date: Date, comment: String },
      ],
   },
   { timestamps: true }
);

export default model<IDocument>("Project", projectSchema);
