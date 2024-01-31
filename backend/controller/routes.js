import { userVerification } from "./AuthMiddleware.js";
import {Login, Signup} from "./controller.js";
import { Router } from 'express';
const router = Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post('/', userVerification)

export { router as authRoute };
