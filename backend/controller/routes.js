import { userVerification } from "./AuthMiddleware.js";
import {FindArticle, Login, PostArticle, Signup} from "./controller.js";
import { Router } from 'express';
const router = Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post('/', userVerification)
router.get("/read/:id", FindArticle);
router.post("/write", PostArticle);

export { router as authRoute };
