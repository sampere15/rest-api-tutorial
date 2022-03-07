import { Request, Response } from "express";
import { createSession, findSessions, updateSession } from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { signJwt } from "../utils/jwt";
import config from "config";

export async function createuserSessionHandler(req: Request, res: Response) {
    // Validate the users password
    const user = await validatePassword(req.body);

    if (!user) {
        return res.status(401).send("Invalid email or password");
    }

    // create a sessionç
    const session = await createSession(user._id, req.get("user-agent") || "");

    // create an access token
    const accessToken = signJwt(
        { ...user, sessionId: session._id },
        { expiresIn: config.get<string>("accessTokenTTL") } // 15 minutes
    );

    // create a refresh token
    const refreshToken = signJwt(
        { ...user, sessionId: session._id },
        { expiresIn: config.get<string>("refreshTokenTTL") } // 15 minutes
    );

    // return access & refresh tokens
    return res.send({ accessToken, refreshToken });
}

export async function getUserSessionsHandler(req: Request, res: Response) {
    const userId = res.locals.user._id;

    const sessions = await findSessions({ user: userId, valid: true });

    return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
    const sessionId = res.locals.user.sessionId;

    await updateSession({ _id: sessionId }, { valid: false });

    return res.send({
        accessToken: null,
        refreshToken: null,
    });
}
