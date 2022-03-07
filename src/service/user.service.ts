import { omit } from "lodash";
import { DocumentDefinition, FilterQuery } from "mongoose";
import UserModel, { UserDocument } from "../models/user.model";

export async function createUser(
    input: DocumentDefinition<Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">>
) {
    try {
        const user = await UserModel.create(input);

        return omit(user.toJSON(), "password");
    } catch (error: any) {
        throw new Error(error);
    }
}

// Con este tipo de anotación indicamos que aunque nos venga un JSON con muchos parámetros, tan sólo
// nos vamos a quedar con estos
export async function validatePassword({ email, password }: { email: string; password: string }) {
    const user = await UserModel.findOne({ email });

    if (!user) {
        return false;
    }

    const isValid = await user.comparePassword(password);
    return !isValid ? false : omit(user.toJSON(), "password");
}

export function findUser(filter: FilterQuery<UserDocument>) {
    return UserModel.find(filter);
}
