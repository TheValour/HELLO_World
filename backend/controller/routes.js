import { userVerification, Login, Signup } from "./AuthMiddleware.js";
import {FindArticle, PostArticle, FindList, FindTag } from "./controller.js";
import { Router } from 'express';
const router = Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post('/', userVerification)

router.get("/list", FindList);
router.get("/list/:tag", FindTag);
router.get("/read/:id", FindArticle);
router.post("/write", PostArticle);

export { router as authRoute };
