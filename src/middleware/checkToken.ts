import { Request, Response, NextFunction } from "express";
import { get } from "lodash";
import SessionModel from "../models/session.model";
import { reIssueAccessToken } from "../service/session.service";
import { verifyJwt } from "../utils/jwt";

const checkToken = async (req: Request, res: Response, next: NextFunction) => {
    // Recuperamos el JWT de la cabecera y le quitamos la parte del Bearer
    const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "");
    const refreshToken = get(req, "headers.x-refresh", "");

    if (!accessToken) {
        return res.status(403).send("Not authorized");
    }

    let { decoded, expired } = verifyJwt(accessToken);

    // Comprobamos si el token no es válido o si ha expirado
    if (!decoded) {
        // Si ha expirado y nos llega un refreshToken, intentamos regenerarlo de nuevo
        if (expired && refreshToken) {
            const newAccessToken = await reIssueAccessToken(refreshToken);

            if (!newAccessToken) {
                return res.status(403).send("Not authorized");
            }

            console.log("Token actualizado");

            // Setteamos el nuevo token en las cabeceras
            res.setHeader("x-access-token", newAccessToken);
            // Decodificamos el nuevo token
            decoded = verifyJwt(newAccessToken).decoded;
        } else {
            return res.status(403).send("Not authorized");
        }
    }

    // Intentamos recuperar la session para asegurarnos que sigue siendo válida
    try {
        const session = await SessionModel.findOne({ _id: decoded.sessionId });
        if (!session?.valid) {
            return res.status(403).send("Session is not valid");
        }
    } catch (error) {
        return res.status(400).send("General error");
    }

    // Añadimos el usuario userId para tenerlo accesible en los controllers
    res.locals.user = decoded;

    return next();
};

export default checkToken;
