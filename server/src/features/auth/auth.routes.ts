import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { validateJWT } from "../../middlewares/validateJWT.js";
import { hasRole } from "../../middlewares/hasRole.js";
import { loginInputSchema, registerUserInputSchema } from "../../../../shared/auth.schema.js";
import { idParamsSchema } from "../../../../shared/common.schema.js";
import { deleteUser, getUsers, login, registerUser } from "./auth.controller.js";

export const authRoutes = Router();

authRoutes.get("/users", validateJWT, hasRole("admin"), getUsers);

authRoutes.post("/login", validate({ body: loginInputSchema }), login);

authRoutes.post("/register", validateJWT, hasRole("admin"), validate({ body: registerUserInputSchema }), registerUser);

authRoutes.delete("/users/:id", validateJWT, validate({ params: idParamsSchema }), deleteUser);
