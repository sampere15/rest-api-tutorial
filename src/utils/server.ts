import express from "express";
import routes from "../routes";

function createServer() {
    const app = express();

    // Necesario para parsear todas las peticiones a json
    app.use(express.json());

    // Configuramos los endpoints
    routes(app);

    return app;
}

export default createServer;
