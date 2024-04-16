import mongoose from "mongoose";

export const dbConnection = async(): Promise<void> => {
    mongoose.set("strictQuery", false)

    try {
        await mongoose.connect(process.env.MONGODB_CNN as string);
        console.log("Base de dato online")

    } catch (error) {
        console.log(error)
        throw new Error("Error en la hora de iniciar la base de datos")
    }
}