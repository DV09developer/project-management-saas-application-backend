import { Router } from "express";
import createProject from "../controllers/project.controller.js";
import { verifyAccessToken } from "../middlewares/auth.middleware.js";

const router = Router;

router.route("/create-project").post(verifyAccessToken, createProject);

router.route("/update-project").post(verifyAccessToken, updateProject);

export { router };