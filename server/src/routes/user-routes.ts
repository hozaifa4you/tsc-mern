import { Router } from "express";
import asyncHandler from "express-async-handler";

import userCtrls from "../controllers/user-ctrls";

const router: Router = Router();

/**
 * @desc login user
 * @method POST
 * @route /api/v1/users/login
 */
router.route("/login").post(asyncHandler(userCtrls.login));
/**
 * @desc create new user
 * @method {POST, PUT & DELETE}
 * @route /api/v1/users/
 */
router.route("/").post(asyncHandler(userCtrls.createUser));
/**
 * @desc get all users
 * @method GET
 * @route /api/v1/users/all-users
 */
router.route("/all-users").get(asyncHandler(userCtrls.getUsers));
/**
 * @desc get user by id & update a user & delete a user
 * @method GET
 * @route /api/v1/users/:id
 */
router
   .route("/:id")
   .get(asyncHandler(userCtrls.getUserById))
   .put(asyncHandler(userCtrls.updateUser))
   .delete(asyncHandler(userCtrls.deleteUser));
export default router;
