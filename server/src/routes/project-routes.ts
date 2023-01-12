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
 * @method GET
 * @route /api/v1/projects/get-all-projects
 */
router
   .route("/get-all-projects")
   .get(asyncHandler(projectsCtrls.getAllProjects));

/**
 * @desc Get all projects & create a project
 * @method POST
 * @route /api/v1/projects/get-all-projects
 */
router
   .route("/create-new-projects")
   .post(
      asyncHandler(authentication),
      asyncHandler(projectsCtrls.createANewProject)
   );

/**
 * @desc test for unique slug
 * @method POST
 * @route /api/v1/projects/slug-test
 */
router
   .route("/slug-test")
   .post(asyncHandler(authentication), asyncHandler(projectsCtrls.slugTest));

/**
 * @desc find project by slug
 * @method GET
 * @route /api/v1/projects/find-projects/:slug
 */
router
   .route("/find-projects/:slug")
   .get(asyncHandler(projectsCtrls.getAProjectById));

/**
 * @desc update project by id
 * @method PUT
 * @route /api/v1/projects/update-projects/:id
 */
router
   .route("/update-projects/:id")
   .put(
      asyncHandler(authentication),
      asyncHandler(projectsCtrls.updateProjectById)
   );

/**
 * @desc delete project by id
 * @method DELETE
 * @route /api/v1/projects/delete-projects/:id
 */
router
   .route("/delete-projects/:id")
   .delete(
      asyncHandler(authentication),
      asyncHandler(projectsCtrls.deleteProjectsById)
   );

/**
 * @desc upload project photos
 * @method POST
 * @route /api/v1/projects/delete-projects/:id
 */
router
   .route("/project-photos/upload")
   .post(
      asyncHandler(authentication),
      asyncHandler(createPermission),
      asyncHandler(upload.array("project", 5)),
      asyncHandler(projectsCtrls.uploadProjectImage)
   );

/**
 * @desc delete project photos
 * @method POST
 * @route /api/v1/projects/delete-photo
 */
router
   .route("/delete-photo/delete")
   .post(asyncHandler(projectsCtrls.deletePhotos));

export default router;

/**
 * @desc add a suggestion
 * @method POST
 * @route /api/v1/projects/suggestions/add/:project_id
 */
router
   .route("/suggestions/add/:project_id")
   .post(
      asyncHandler(authentication),
      asyncHandler(projectsCtrls.addSuggestions)
   );
