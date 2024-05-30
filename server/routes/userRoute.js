import { Router } from "express";
import passport from "passport";
const router = Router();
import {getUser} from "../controllers/userController.js"
router.get("/",passport.authenticate('jwt', { session: false }),getUser)
export default router;