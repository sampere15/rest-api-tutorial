import jwt from "jsonwebtoken";
import config from "config";
import logger from "./logger";

const privateKey = config.get<string>("privateKey");
const publicKey = config.get<string>("publicKey");

// Genero un token jwt firmado
export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
    const token = jwt.sign(object, privateKey, {
        ...(options && options), // Función para añadir las opciones pasadas por argumento si es que se han pasado
        algorithm: "RS256",
    });

    return token;
}

export function verifyJwt(token: string): any {
    try {
        const decoded = jwt.verify(token, publicKey);

        return {
            valid: true,
            expired: false,
            decoded,
        };
    } catch (error: any) {
        logger.warn(error.message);

        return {
            valid: false,
            expired: error.message === "jwt expired",
            decoded: null,
        };
    }
}
