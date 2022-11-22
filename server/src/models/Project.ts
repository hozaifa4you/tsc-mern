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

interface IPhotos {
   uid: string | number;
   name: string;
   status: string | "done";
   url: string;
}

export interface IDocument extends Document {
   title: string;
   creator: Schema.Types.ObjectId;
   projectManager: Schema.Types.ObjectId;
   desc: string;
   photos: IPhotos[]; // done
   instructor: Schema.Types.ObjectId;
   joined: Schema.Types.ObjectId[];
   status: IProjectStatus;
   category: string; // done
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
      title: { type: String, required: true, trim: true },
      desc: { type: String, required: true, trim: true },
      category: { type: String, required: true },
      photos: [
         {
            uid: String || Number,
            name: String,
            status: { type: String, default: "done" },
            url: String,
         },
      ],
      instructor: { type: Schema.Types.ObjectId, ref: "User" },
      joined: { type: [Schema.Types.ObjectId], ref: "User" },
      // FIXME: fix in future
      // status: [
      //    {
      //       start: Date,
      //       end: Date,
      //       status: { type: String, required: true, enum: EStatus },
      //    },
      // ],
      status: { type: String, required: true, trim: true, enum: EStatus },
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
