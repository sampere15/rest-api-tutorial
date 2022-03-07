import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

// Definición Typescript para integrador el tipado del modelo con typescript
export interface UserDocument extends mongoose.Document {
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

// Definición del esquema del modelo
const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        password: { type: String, required: true },
    },
    {
        timestamps: true, // Para que incluya el created at y updated at
    }
);

// Antes de almacenar un usuario en la DB si la contraseña se ha modificado la hasheamos
userSchema.pre("save", async function (next) {
    let user = this as UserDocument;
    const salt = config.get<number>("saltWorkFactor");

    // Si no se ha modificado la contraseña, no hacemos nada
    if (!user.isModified("password")) {
        return next();
    }

    user.password = bcrypt.hashSync(user.password, salt);

    return next();
});

// Función que nos indica si la contraseña indicada coincide con la almacenada
// Devolvemos un Promise ya que se trata de una función asíncrona
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    const user = this as UserDocument;

    return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

// Definifición del modelo que utiliza el schama declarado
const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
