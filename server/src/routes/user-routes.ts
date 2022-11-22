import { Router } from "express";
import asyncHandler from "express-async-handler";

import userCtrls from "../controllers/user-ctrls";
import {
   authentication,
   createPermission,
} from "../middleware/authentications";

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
router.route("/").post(
   // asyncHandler(authentication),
   // asyncHandler(createPermission),
   asyncHandler(userCtrls.createUser)
);
/**
 * @desc get all users
 * @method GET
 * @route /api/v1/users/all-users
 */
router.route("/all-users").get(asyncHandler(userCtrls.getUsers));

// HACK get all users for create user  @return { _id, name, username, avatar, userType }
/**
 * @desc get all users
 * @method GET
 * @route /api/v1/users/all-users
 */
router
   .route("/select-users")
   .get(
      asyncHandler(authentication),
      asyncHandler(userCtrls.getAllUserForSelect)
   );

/**
 * @desc get user by id & update a user & delete a user
 * @method GET
 * @route /api/v1/users/:id
 */
router
   .route("/:id")
   .get(asyncHandler(userCtrls.getUserById)) // TODO get user by id
   .put(asyncHandler(authentication), asyncHandler(userCtrls.updateUser)) // TODO update user by id
   .delete(asyncHandler(authentication), asyncHandler(userCtrls.deleteUser)); // TODO delete user by id
export default router;
