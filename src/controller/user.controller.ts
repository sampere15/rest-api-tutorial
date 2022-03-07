import { Request, Response, NextFunction } from "express";
import { createUser } from "../service/user.service";
import logger from "../utils/logger";

export async function createUserHandler(req: Request, res: Response) {
    try {
        const user = await createUser(req.body);
        return res.send(user);
    } catch (error: any) {
        logger.error(error);
        return res.status(400).send(error.message);
    }
}
