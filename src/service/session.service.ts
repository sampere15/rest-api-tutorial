import SessionModel, { SessionDocument } from "../models/session.model";
import { FilterQuery, UpdateQuery } from "mongoose";
import { signJwt, verifyJwt } from "../utils/jwt";
import { get } from "lodash";
import { findUser } from "./user.service";
import config from "config";

export async function createSession(userId: string, userAgent: string) {
    const session = await SessionModel.create({ user: userId, userAgent });

    return session.toJSON();
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
    // Con el lean devolvemos el objeto como si fuera un JSON sin las funciones
    return SessionModel.find(query).lean();
}

export async function updateSession(query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>) {
    return SessionModel.updateOne(query, update);
}

export async function reIssueAccessToken(refreshToken: string) {
    const { decoded } = verifyJwt(refreshToken);

    if (!decoded || !get(decoded, "sessionId")) {
        return false;
    }

    const session = await SessionModel.findById(get(decoded, "sessionId"));
    if (!session || !session.valid) {
        return false;
    }

    const user = await findUser({ _id: session.user });
    if (!user) {
        return false;
    }

    // Creamos un nuevo accessToken
    const accessToken = signJwt(
        { ...user, sessionId: session._id },
        { expiresIn: config.get<string>("accessTokenTTL") } // 15 minutes
    );

    return accessToken;
}
