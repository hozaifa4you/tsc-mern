import { Router } from "express";

import projectsCtrls from "../controllers/projects-ctrls";

const router: Router = Router();

/**
 * @desc Get all projects & create a project
 * @method GET & POST
 */
router
   .route("/")
   .get(projectsCtrls.getAllProjects)
   .post(projectsCtrls.createANewProject);

/**
 * @desc get a project by id & update a project by id
 * @method GET & PUT
 */
router
   .route("/:id")
   .get(projectsCtrls.getAProjectById)
   .put(projectsCtrls.updateProjectById);

/**
 * @desc delete a project by id
 * @method DELETE
 */
router.route("/:id").delete(projectsCtrls.deleteProjectsById);

export default router;
