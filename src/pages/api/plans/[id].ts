import type { NextApiRequest, NextApiResponse } from "next";
import { ICourse } from "@/server/db/models/Course";
import { IPlan } from "@/server/db/models/Plan";
import { getPlan } from "@/server/db/actions/plans";
import { getCourses, updateCourses } from "@/server/db/actions/courses";
type Data = {
    error?: string;
    data?: {
        plan?: IPlan;
        courses: ICourse[];
    };
};
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    if (req.method === "GET") {
        const { error, data: plan } = await getPlan("1234");
        if (error) {
            return res.status(500).json({ error });
        }
        const { error: err, data: courses } = await getCourses("1234");
        if (err) {
            return res.status(500).json({ error: err });
        }
        return res.status(200).json({ data: { plan: plan, courses: courses } });
    } else if (req.method === "PATCH") {
        // update a plan -> which means update courses in plan
        if (!req.query.id) {
            return res.status(400).json({ error: "Please provide a plan id" });
        }
        if (typeof req.query.id === "object") {
            req.query.id = req.query.id[0];
        }
        const { error, success } = await updateCourses(req.query.id, req.body.courses);
        if (!success) {
            return res.status(500).json({ error });
        }
        return res.status(200).end();
    }
    
    return res.status(405).end();
}