import { Schema, model, Document } from "mongoose";

export interface IDocument extends Document {
   title: string;
   createdAt?: Date;
   updatedAt?: Date;
}

const projectSchema = new Schema<IDocument>(
   {
      title: { type: String, required: true, unique: true },
   },
   { timestamps: true }
);

export default model<IDocument>("Project", projectSchema);
