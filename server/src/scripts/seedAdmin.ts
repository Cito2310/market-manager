// No verificado por humano
import mongoose from "mongoose";
import { genSaltSync, hashSync } from "bcryptjs";
import { connectDB } from "../config/connectDB.js";
import { registerUserInputSchema } from "../../../shared/auth.schema.js";
import { UserModel } from "../features/auth/auth.model.js";

const [username, password, name] = process.argv.slice(2);

const seedAdmin = async (): Promise<void> => {
    const { password: plainPassword, ...admin } = registerUserInputSchema.parse({
        username,
        password,
        name,
        role: "admin",
        createdBy: "system",
        updatedBy: "system"
    });

    await connectDB();
    await UserModel.create({ ...admin, passwordHash: hashSync(plainPassword, genSaltSync()) });
    console.log(`Admin "${admin.username}" created`);
    await mongoose.disconnect();
};

seedAdmin().catch(async (error) => {
    console.error(error);
    await mongoose.disconnect();
    process.exit(1);
});
