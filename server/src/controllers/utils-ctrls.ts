import { Request, Response } from "express";

import Category from "../models/Category";

interface ICategory {
   category: string;
}

class UtilsControllers {
   /**
    *
    * @param req {request: Express Request}
    * @param res {response: Express Response}
    */
   async createCategory(req: Request, res: Response) {
      const { category } = <ICategory>req.body;

      const categoryDatabase = await Category.findOne({});

      let categoryRes;

      if (!categoryDatabase) {
         categoryRes = await Category.create(category);
         res.status(201).json({ success: true, category: categoryRes });
      } else {
         res.status(500);
         throw new Error("Category already exist, Please push new category.");
      }
   }
   /**
    *
    * @param req {request: Express Request}
    * @param res {response: Express Response}
    */
   async updateCategory(req: Request, res: Response) {
      const { category } = <ICategory>req.body;

      if (!category) {
         res.status(400);
         throw new Error("Empty body can't be saved!");
      }

      const categoryDatabase = await Category.findOne({});

      if (categoryDatabase?.category.find((x) => x === category)) {
         res.status(400);
         throw new Error("This category already exist!");
      }

      if (!categoryDatabase) {
         res.status(404);
         throw new Error("Please create a new category packet!");
      } else {
         categoryDatabase.category.push(category);
         await categoryDatabase.save();
         res.status(200).json({ success: true, category: categoryDatabase });
      }
   }
   /**
    *
    * @param req {request: Express Request}
    * @param res {response: Express Response}
    */
   async getCategories(req: Request, res: Response) {
      const categories = await Category.findOne({});

      if (!categories) {
         res.status(404);
         throw new Error("No category packet found, please create first!");
      } else {
         res.status(200).json({
            success: true,
            categories: categories.category,
         });
      }
   }
}

export default new UtilsControllers();
