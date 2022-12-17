import { Schema, model, Document } from "mongoose";

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

export enum EEventStatus {
   UpComing = "up coming",
   Progressing = "progressing",
   End = "end",
   Cancel = "cancel",
}

interface IProjectStatus {
   creator: Schema.Types.ObjectId;
   date: Date;
   status: EStatus;
   desc: string;
   photos: string[];
}

interface ISuggestions {
   user: Schema.Types.ObjectId;
   date: Date;
   comment: string;
}

interface IPhotos {
   uid: string | number;
   name: string;
   status: string | "done";
   url: string;
}

interface ITeamResponseData {
   good: Schema.Types.ObjectId[];
   positive: Schema.Types.ObjectId[];
   nothing: Schema.Types.ObjectId[];
   bad: Schema.Types.ObjectId[];
}

interface IEventsData {
   creator: Schema.Types.ObjectId;
   eventName: string;
   createDate: Date;
   startingDate: Date;
   endDate: Date;
   desc: string;
   status: EEventStatus;
   photo: string;
}

export interface IDocument extends Document {
   title: string;
   creator: Schema.Types.ObjectId;
   projectManager: Schema.Types.ObjectId;
   desc: string;
   photos: IPhotos[];
   instructor: Schema.Types.ObjectId;
   joined: Schema.Types.ObjectId[];
   status: IProjectStatus; // TODO recent fixed
   category: string;
   love: Schema.Types.ObjectId[];
   suggestion: ISuggestions[];
   projectType: ProjectType;
   slug: string;
   readTime: number;
   teamResponse: ITeamResponseData;
   events: IEventsData[];
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
      status: [
         {
            creator: { type: Schema.Types.ObjectId, ref: "User" },
            date: Date,
            status: { type: String, enum: EStatus },
            desc: String,
            photos: [String],
         },
      ],
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
      teamResponse: {
         good: [{ type: Schema.Types.ObjectId, ref: "User" }],
         positive: [{ type: Schema.Types.ObjectId, ref: "User" }],
         bad: [{ type: Schema.Types.ObjectId, ref: "User" }],
         nothing: [{ type: Schema.Types.ObjectId, ref: "User" }],
      },
      events: [
         {
            creator: { type: Schema.Types.ObjectId, ref: "User" },
            eventNames: String,
            createDate: Date,
            startingDate: Date,
            endDate: Date,
            desc: String,
            status: { type: String, enum: EEventStatus },
            photo: String,
         },
      ],
   },
   { timestamps: true }
);

export default model<IDocument>("Project", projectSchema);
