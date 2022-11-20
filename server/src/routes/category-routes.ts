import { Router } from "express";
import asyncHandler from "express-async-handler";

import {
   authentication,
   createPermission,
} from "../middleware/authentications";
import categoryCtrls from "../controllers/category-ctrl";

const router: Router = Router();

router
   .route("/")
   .get(
      asyncHandler(authentication),
      asyncHandler(createPermission),
      asyncHandler(categoryCtrls.getCategories)
   )
   .post(
      asyncHandler(authentication),
      asyncHandler(createPermission),
      asyncHandler(categoryCtrls.createCategory)
   )
   .put(
      asyncHandler(authentication),
      asyncHandler(createPermission),
      asyncHandler(categoryCtrls.updateCategory)
   );

export default router;
