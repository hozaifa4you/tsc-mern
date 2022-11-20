import { Schema, model, Document } from "mongoose";

export interface ICategoryDoc extends Document {
   category: string[];
}

const categorySchema = new Schema<ICategoryDoc>(
   {
      category: { type: [String], required: true, trim: true, unique: true },
   },
   { timestamps: true }
);

const categoryModel = model<ICategoryDoc>("Category", categorySchema);

export default categoryModel;
