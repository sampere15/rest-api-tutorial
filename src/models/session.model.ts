import mongoose from "mongoose";
import { UserDocument } from "./user.model";

// Definición Typescript para integrador el tipado del modelo con typescript
export interface SessionDocument extends mongoose.Document {
    user: UserDocument["_id"];
    valid: boolean;
    userAgent: string;
    createdAt: Date;
    updatedAt: Date;
}

// Definición del esquema del modelo
const sessionSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        valid: { type: Boolean, default: true },
        userAgent: { type: String },
    },
    {
        timestamps: true, // Para que incluya el created at y updated at
    }
);

// Definifición del modelo que utiliza el schama declarado
const SessionModel = mongoose.model<SessionDocument>("Session", sessionSchema);

export default SessionModel;
