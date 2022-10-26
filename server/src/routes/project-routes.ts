import { Router } from "express";
import asyncHandler from "express-async-handler";

import projectsCtrls from "../controllers/projects-ctrls";

const router: Router = Router();

/**
 * @desc Get all projects & create a project
 * @method GET & POST
 */
router
   .route("/")
   .get(asyncHandler(projectsCtrls.getAllProjects))
   .post(asyncHandler(projectsCtrls.createANewProject));

/**
 * @desc get a project by id & update a project by id & delete a project by id
 * @method GET & PUT & DELETE
 */
router
   .route("/:id")
   .get(asyncHandler(projectsCtrls.getAProjectById))
   .put(asyncHandler(projectsCtrls.updateProjectById))
   .delete(asyncHandler(projectsCtrls.deleteProjectsById));

export default router;
