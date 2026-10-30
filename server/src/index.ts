// No verificado por humano
import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import { connectDB } from "./config/connectDB.js";
import { categoryRoutes } from "./features/category/category.routes.js";
import { authRoutes } from "./features/auth/auth.routes.js";
import { productRoutes } from "./features/product/product.routes.js";
import { stockMovementRoutes } from "./features/stockMovement/stockMovement.routes.js";
import { stockSnapshotRoutes } from "./features/stockSnapshot/stockSnapshot.routes.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errors/errorHandler.js";

const app = express();

app.use(cors({ origin: env.corsOrigin }));
app.use(express.json({ limit: "5mb" }));

app.get("/", (_req, res) => {
    res.send("OK");
});

app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/stock-movements", stockMovementRoutes);
app.use("/api/stock-snapshots", stockSnapshotRoutes);

app.use(notFound);
app.use(errorHandler);

const startServer = async (): Promise<void> => {
    await connectDB();
    app.listen(env.port, () => {
        console.log(`Server running at http://localhost:${env.port}`);
    });
};

startServer();
