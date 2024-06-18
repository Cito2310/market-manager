import { model, Schema } from "mongoose";
import { IUserMongo } from "../../types/User";


const userSchema = new Schema<IUserMongo>({
    password: {type: String, required: true},
    username: {type: String, required: true},
})

userSchema.methods.toJSON = function() {
    const {__v , password, ...rest } = this.toObject();
    return rest;
}

export const User = model("User", userSchema);