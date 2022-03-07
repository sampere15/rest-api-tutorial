import { Express, Request, Response } from "express";
import {
    createuserSessionHandler,
    deleteSessionHandler,
    getUserSessionsHandler,
} from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import checkToken from "./middleware/checkToken";
import schemaValidator from "./middleware/schemaValidator";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";

function routes(app: Express) {
    app.get("/api/healthcheck", (req: Request, res: Response) => res.sendStatus(200));
    app.post("/api/sessions", schemaValidator(createSessionSchema), createuserSessionHandler);
    app.post("/api/users", schemaValidator(createUserSchema), createUserHandler);

    // A partir de estas rutas validamos que tenga un token jwt válido
    app.use(checkToken);

    app.get("/api/sessions", getUserSessionsHandler);
    app.delete("/api/sessions", deleteSessionHandler);
}

export default routes;
