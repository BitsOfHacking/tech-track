import mongoose, { Schema, Types } from "mongoose";
import { IPlan } from "./Plan";

export enum CoreType {
    CORE_A = "CORE_A",
    CORE_B = "CORE_B",
    CORE_C = "CORE_C",
    CORE_D = "CORE_D",
    CORE_E = "CORE_E",
    CORE_F = "CORE_F",
    CORE_UNKNOWN = "CORE_UNKNOWN",
    MAJOR_REQUIREMENTS = "MAJOR_REQUIREMENTS",
    MAJOR_ELECTIVES = "MAJOR_ELECTIVES",
}

export interface ICourse extends Document {
    _id: Types.ObjectId;
    topic: string;
    number: number;
    title: string;
    plan: Types.ObjectId | IPlan;
    core: CoreType[];
    selectedCore: CoreType;
    completed: boolean;
    credits: number;
    prereqs: String;
}

const CourseSchema = new Schema<ICourse>({
    topic: {
        type: String,
        required: [true, "Please provide a topic for this course."],
        maxlength: [4, "Course topic cannot be more than 4 characters"],
    },
    number: {
        type: Number,
        required: [true, "Please provide a number for this course."],
    },
    title: {
        type: String,
    },
    plan: {
        type: Schema.Types.ObjectId,
        ref: "Plan",
        required: [true, "Please provide a plan for this course."],
    },
    core: {
        type: [String],
        enum: Object.values(CoreType),
        required: [true, "Please provide a core for this course."],
    },
    selectedCore: {
        type: String,
        enum: Object.values(CoreType),
    },
    completed: {
        type: Boolean,
        default: false,
    },
    credits: {
        type: Number,
        required: [true, "Please provide credits for this course."],
    },
    prereqs: {
        type: String,
    },
});

export default mongoose.models.Course || mongoose.model<ICourse>("Course", CourseSchema);