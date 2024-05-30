import { Router } from "express";
import passport from "passport"
import {getTransactionDetails,
        createTransaction,
        deleteTransaction,
        editTransaction
} from "../controllers/transController.js"
const router=Router();

router.get("/", passport.authenticate('jwt', { session: false }),getTransactionDetails)
router.post("/",createTransaction)
router.delete('/:id',deleteTransaction)
router.patch('/:id',editTransaction)
export default router;