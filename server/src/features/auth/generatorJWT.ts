import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";

export const generatorJWT = (payload: { [key: string]: unknown }): Promise<string> => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, env.secretOrPrivateKey, { expiresIn: "20h" }, (err, token) => {
            if (err) {
                console.log(err);
                reject("Could not generate the token");
            } else {
                resolve(token as string);
            }
        });
    });
};
