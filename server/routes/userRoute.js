import { Router } from "express";
import passport from "passport";
import { stringify } from "flatted";
const router = Router();

router.get(
    "/",
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.json({ user: req.user });
    })
export default router;