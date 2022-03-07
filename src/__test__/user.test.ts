import createServer from "../utils/server";
import * as UserService from "../service/user.service";
import mongoose from "mongoose";
import supertest from "supertest";

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

const userPayload = {
    _id: userId,
    email: "correo@correo.com",
    name: "Correo",
};

const userInput = {
    email: "correo@correo.com",
    name: "Correo",
    password: "123123",
    passwordConfirm: "123123",
};

// prettier-ignore
describe("user", () => {
    // User registration
    describe("user registration", () => {
        // username y password get validation
        describe("given username and password are valid", () => {
            it("should return the user payload", async () => {
                const createUserServiceMock = jest.spyOn(UserService, "createUser")
                    // @ts-ignore
                    .mockReturnValueOnce(userPayload);

                const {statusCode, body} = await supertest(app).post("/api/users")
                    .send(userInput);

                expect(statusCode).toBe(201);

                expect(body).toEqual(userPayload);

                expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
            });
        });
    });
});
