import dbConnect from "../dbConnect";
import Course from "../models/Course";
import { ICourse } from "../models/Course";

export async function createCourse(course: ICourse): Promise<{
    error?: string;
    data?: ICourse;
}> {
    try {
        await dbConnect();
        const newCourse = await Course.create(course);
        return { data: newCourse };
    } catch (error: any) {
        return { error: error.message };
    }
}

export async function getCourses(plan_id: string): Promise<{
    error?: string;
    data: Array<ICourse>;
}> {
    try {
        await dbConnect();
        const courses: Array<ICourse> = await Course.find({plan: plan_id});
        return {
            data: courses,
        };
    } catch (error: any) {
        return { error: error.message, data: [] };
    }
}

export async function updateCourse(course_id: string, newCourse: ICourse): Promise<{
    error?: string;
    data?: ICourse;
}> {
    try {
        await dbConnect();
        const updatedCourse = await Course.findByIdAndUpdate(course_id, newCourse, {
            new: true,
            runValidators: true,
        });
        return { data: updatedCourse };
    } catch (error: any) {
        return { error: error.message };
    }
}

export async function updateCourses(plan_id: string, newCourses: ICourse[]): Promise<{
    error?: string;
    success: boolean;
}> {
    try {
        await dbConnect();
        const bulkWriteQuery = newCourses.map((course) => {
            return {
                updateOne: {
                    filter: { _id: course._id, plan: plan_id },
                    update: course,
                },
            };
        });

        const updatedCourses = await Course.bulkWrite(
            bulkWriteQuery,
            { ordered: false, bypassDocumentValidation: true },
        );
        return { success: updatedCourses.ok === 1};
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}