import type { NextApiRequest, NextApiResponse } from "next";
import { ICourse } from "@/server/db/models/Course";
import { getReqs } from "@/server/db/actions/courses";
type Data = {
    courses: Array<ICourse>;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    try {
        const reqs = await getReqs()
        res.status(200).json(reqs);
    } catch (e) {
        res.status(500).json({ courses: [] });
    }

}