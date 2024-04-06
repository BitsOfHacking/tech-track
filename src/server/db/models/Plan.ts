import mongoose, { Types, Document, Schema } from "mongoose";
import { IUser } from "./User";
export interface IPlan extends Document {
    name: string;
    semesters: string[];
    user: Types.ObjectId | IUser;
}

const PlanSchema = new Schema<IPlan>({
    name: {
        type: String,
        required: [true, "Please provide a name for this plan."],
        maxlength: [60, "Name cannot be more than 60 characters"],
    },
    semesters: {
        type: [String],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide a user for this plan."],
    },
});

export default mongoose.models.Plan || mongoose.model<IPlan>("Plan", PlanSchema);