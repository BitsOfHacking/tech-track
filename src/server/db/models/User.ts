import mongoose, { Types, Document, Schema } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    hash: string;
    major: string;
    year: string;
    creditsEarned: number;
}

const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, "Please provide a name for this user."],
        maxlength: [60, "Name cannot be more than 60 characters"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email for this user."],
    },
    hash: {
        type: String,
        required: [true, "Please provide a password for this user."],
    },
    major: {
        type: String,
        required: [true, "Please provide a major for this user."],
    },
    year: {
        type: String,
        required: [true, "Please provide a year for this user."],
    },
    creditsEarned: {
        type: Number,
        required: [true, "Please provide credits earned for this user."],
    },
});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);