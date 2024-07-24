import { Router } from "express";

import { checkEmail } from "../../middleware/checkEmail.js";
import { changerUserPassword, signin, signup } from "./auth.contoller.js";


const authRouter = Router();

authRouter.post('/signup', checkEmail, signup)
authRouter.post('/signin', signin)
authRouter.patch('/change-password', changerUserPassword)


export default authRouter;