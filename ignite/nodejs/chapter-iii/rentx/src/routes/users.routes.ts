import { Router } from "express";
import multer from "multer";

import uploadConfig from "../config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post("/", createUserController.handle);
// usersRoutes.get("/", ListUsersController.handle);

usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  // esse nome é como vem no form
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

export { usersRoutes };
