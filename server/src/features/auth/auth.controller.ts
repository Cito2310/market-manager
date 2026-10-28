import { Request, Response } from "express";
import { LoginInput, RegisterUserInput } from "../../../../shared/auth.schema.js";
import { genSaltSync, hashSync, compareSync } from "bcryptjs";
import { UserModel } from "./auth.model.js";
import { generatorJWT } from "./generatorJWT.js";
import { HttpError } from "../../middlewares/errors/HttpError.js";

export const getUsers = async (req: Request, res: Response) => {
    const users = await UserModel.find();
    res.status(200).json(users);
};

export const login = async (req: Request, res: Response) => {
    const { password, username } = req.body as LoginInput;

    const user = await UserModel.findOne({ username });
    if (!user) throw new HttpError(400, "Login invalid");

    const samePassword = compareSync(password, user.passwordHash);
    if (!samePassword) throw new HttpError(400, "Login invalid");

    if (!user.active) throw new HttpError(403, "User is inactive");

    const token: string = await generatorJWT({ id: user._id });

    res.status(200).json({ token, user: user.toJSON() });
};

export const registerUser = async (req: Request, res: Response) => {
    const { password, ...bodyUser } = req.body as RegisterUserInput;
    const { _id } = req.user;

    const salt = genSaltSync();
    const passwordHash = hashSync(password, salt);

    const newUser = new UserModel({ passwordHash, ...bodyUser, createdBy: _id, updatedBy: _id });
    await newUser.save();

    const token = await generatorJWT({ id: newUser._id });

    res.status(201).json({ user: newUser, token });
};

export const deleteUser = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const { _id, role } = req.user;

    const isSelf = _id.equals(id);
    if (role !== "admin" && !isSelf) throw new HttpError(403, "Insufficient permissions");

    const user = await UserModel.findByIdAndUpdate(id, { active: false, updatedBy: _id }, { returnDocument: "after" });
    if (!user) throw new HttpError(404, "User not found");

    res.status(200).json(user);
};
