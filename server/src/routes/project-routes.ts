import { Router } from "express";
import asyncHandler from "express-async-handler";

import projectsCtrls from "../controllers/projects-ctrls";
import {
   authentication,
   createPermission,
} from "../middleware/authentications";
import { upload } from "../middleware/uploader";

const router: Router = Router();

/**
 * @desc Get all projects & create a project
 * @method GET & POST
 */
router
   .route("/")
   .get(asyncHandler(projectsCtrls.getAllProjects))
   .post(
      asyncHandler(authentication),
      asyncHandler(projectsCtrls.createANewProject)
   );

/**
 * @desc get a project by id & update a project by id & delete a project by id
 * @method GET & PUT & DELETE
 */
router
   .route("/:slug")
   .get(asyncHandler(projectsCtrls.getAProjectById))
   .put(
      asyncHandler(authentication),
      asyncHandler(projectsCtrls.updateProjectById)
   )
   .delete(
      asyncHandler(authentication),
      asyncHandler(projectsCtrls.deleteProjectsById)
   );

router
   .route("/upload")
   .post(
      asyncHandler(authentication),
      asyncHandler(createPermission),
      asyncHandler(upload.array("project", 5)),
      asyncHandler(projectsCtrls.uploadProjectImage)
   );

export default router;
