import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
    body: object({
        name: string({
            required_error: "Name is required",
        }),
        password: string({
            required_error: "Password is required",
        }).min(6, "Password to short. Should be 6 chars minimum"),
        passwordConfirm: string({
            required_error: "Password confirmation is required",
        }),
        email: string({
            required_error: "Email is required",
        }).email("Email is not valid"),
    })
        // Definimos una funición personalizada para comprobar que las contraseñas coinciden
        .refine((data) => data.password === data.passwordConfirm, {
            message: "Passwords do not match",
            path: ["passwordConfirm"],
        }),
});

// Esto nos va a crear una inteface en base al schema
export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, "body.passwordConfirm">;
