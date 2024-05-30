import { Router } from "express";
import { deleteCategory } from "../controllers/categoryController.js";
import { createCategory } from "../controllers/categoryController.js";
import { updateCategory } from "../controllers/categoryController.js";
const router=Router();


router.delete("/:id",deleteCategory)
router.post("/",createCategory);
router.patch("/:id",updateCategory)
export default router;