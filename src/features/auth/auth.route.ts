import { Router } from "express";

import { validate } from "../../middleware/validate.middleware";
import { authController } from "./auth.controller";
import { loginSchema, registerSchema, verifySchema } from "./auth.schema";
import { verifyToken } from "../../middleware/auth.middleware";

const router = Router();

// Mendaftarkan akun user baru.
router.post("/register", validate(registerSchema), authController.registerUser);

// Login user dan mengembalikan token autentikasi.
router.post("/login", validate(loginSchema), authController.loginUser);

// Memverifikasi kode verifikasi user berdasarkan `user_id`, `code`, dan `type`.
router.post("/verify", validate(verifySchema), authController.verify);

// Logout user yang sedang login.
router.post("/logout", verifyToken, authController.logoutUser);

// Mengambil profil user yang sedang login.
router.get("/me", verifyToken, authController.me);

export default router;
