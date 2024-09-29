import { Router } from 'express';

import { Login, Signup } from "../controller/authController.js";
import { userVerification } from "../controller/AuthMiddleware.js";
import {
    FindArticle, PostArticle, FindList, 
    FindTag, TagListControl, getAdminTagList, 
    getArticleById, UpdateArticle
} from "../controller/controller.js";

const router = Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post('/', userVerification)

router.get("/taglist", TagListControl);
router.get("/admintaglist", getAdminTagList);
router.get("/list", FindList);
router.get("/list/:tag", FindTag);
router.get("/article/:id", getArticleById);
router.get("/read/:id", FindArticle);
router.post("/update", UpdateArticle);
router.post("/write", PostArticle);

export { router as authRoute };
