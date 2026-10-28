import "dotenv/config";

const getEnvVar = (key: string): string => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
    return value;
};

const getOptionalEnvVar = (key: string, fallback: string): string => process.env[key] ?? fallback;

export const env = {
    port: getEnvVar("PORT"),
    mongodbCnn: getEnvVar("MONGODB_CNN"),
    secretOrPrivateKey: getEnvVar("SECRET_OR_PRIVATE_KEY"),
    corsOrigin: getOptionalEnvVar("CORS_ORIGIN", "http://localhost:5173")
};
