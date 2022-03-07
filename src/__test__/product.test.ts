import supertest from "supertest";
import createServer from "../utils/server";
import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import { signJwt } from "../utils/jwt";
import SessionModel from "../models/session.model";

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

const userPayload = {
    _id: userId,
    email: "correo@correo.com",
    name: "Correo",
};

const createUserPayload = {
    email: userPayload.email,
    name: userPayload.name,
    password: "123123",
    passwordConfirm: "123123",
};

const session = SessionModel.create({
    user: userId,
    valid: true,
    userAgent: "Testing",
});

describe.skip("user", () => {
    // Se ejecuta una vez antes de que empiecen los test
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create();

        await mongoose.connect(mongoServer.getUri());
        console.log("Conectado a la BBDD");
    });

    // Se ejecuta una vez han finalizado los test
    afterAll(async () => {
        console.log("Cerrando conexión");
        await mongoose.disconnect();
        await mongoose.connection.close();
    });

    describe("Create a user", () => {
        it("should return a 201", async () => {
            const { statusCode } = await supertest(app).post("/api/users").send(createUserPayload);

            expect(statusCode).toBe(200);
        });
    });

    describe("get user route", () => {
        describe("given the user does not exist", () => {
            it("should return a 404", async () => {
                await supertest(app).get("/api/healthcheck").expect(200);
            });
        });
        describe("given the user is not logged", () => {
            it("should return a 403", async () => {
                const { statusCode } = await supertest(app).get("/api/sessions");

                expect(statusCode).toBe(403);
            });
        });
    });
    describe("given the user is logged", () => {
        it("should return a 200", async () => {
            const jwt = signJwt({ ...userPayload, sessionId: (await session)._id });

            const { body, statusCode } = await supertest(app)
                .get("/api/sessions")
                .set("Authorization", `Bearer ${jwt}`);
            console.log(body);

            expect(statusCode).toBe(200);
        });
    });
});
