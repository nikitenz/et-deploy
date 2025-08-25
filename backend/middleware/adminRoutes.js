import express from "express";
import { authenticate, authorizeRoles } from "./authMiddleware.js";

const router = express.Router();

router.get("/admin-dashboard", authenticate, authorizeRoles("admin"), (req, res) => {
    res.json({message: "Welcome Admin Dashboard"});
});

export default router;