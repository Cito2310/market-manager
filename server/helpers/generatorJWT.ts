import jwt from "jsonwebtoken";

export const generatorJWT = ( payload: { [key: string]: unknown } ): Promise<string> => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload, 
            process.env.SECRET_OR_PRIVATE_KEY as string, 
            { expiresIn: "4h" }, 
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject("No se pudo generar el token");
                } else {
                    resolve(token as string);
                }
        })
    })
}