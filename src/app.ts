import express from "express";
import config from "config";
import connect from "./utils/dbconnect";
import logger from "./utils/logger";
import routes from "./routes";
import checkToken from "./middleware/checkToken";

const app = express();

// Necesario para parsear todas las peticiones a json
app.use(express.json());

const port = config.get<number>("port");

app.listen(port, async () => {
    logger.info(`App is running at http://localhost:${port}`);

    await connect();

    routes(app);
});
