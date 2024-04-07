// import dbConnect from "../dbConnect";
import Course from "../models/Course";
import { ICourse } from "../models/Course";
import { ICourseGroup } from "@/pages/api/parse";

export async function createCourse(course: ICourse): Promise<{
    error?: string;
    data?: ICourse;
}> {
    try {
        // await dbConnect();
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
        // await dbConnect();
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
        // await dbConnect();
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
        // await dbConnect();
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

export async function getReqs(givenCourses: Array<ICourse | ICourseGroup>) {
    // await dbConnect()
    let course_data;
    try {
        const res = await fetch("https://gt-scheduler.github.io/crawler-v2/202408.json")
        course_data = await res.json()
    } catch (error: any) {
        return { error: error.message };
    }
    for (let i = 0; i < givenCourses.length; i++) {
        const course = givenCourses[i]
        if (course?.name) {
            // skip course groups
            continue
        }
        const index = `${course.topic} ${course.number}`
        if (!course_data.courses[index]) {
            continue
        }
        givenCourses[i].prereqs = course_data.courses[index][2]
    }
    return givenCourses;
}