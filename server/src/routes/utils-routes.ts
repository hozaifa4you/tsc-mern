import { Router } from "express";
import asyncHandler from "express-async-handler";

import categoryCtrls from "../controllers/utils-ctrls";

const router: Router = Router();

router
   .route("/categories")
   .get(asyncHandler(categoryCtrls.getCategories))
   .post(asyncHandler(categoryCtrls.createCategory))
   .put(asyncHandler(categoryCtrls.updateCategory));

export default router;
