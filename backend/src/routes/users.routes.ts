import express from "express";
import * as userController from "../controllers/users.controllers.js";
const router = express.Router();

router.get("/user/getAll", userController.getAllUsers );
router.post("/user/create", userController.createUser);

// router.get("/user/readByID/:id", );
// router.post("/user/login", );
// router.put("/user/update/:id",);
// router.delete("/user/delete/:id", );

export default router;
