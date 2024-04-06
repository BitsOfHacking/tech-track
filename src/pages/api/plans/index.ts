import type { NextApiRequest, NextApiResponse } from "next";
import { getUserPlans } from "@/server/db/actions/plans";
import { IPlan } from "@/server/db/models/Plan";
type Data = {
    error?: string;
    data: Array<IPlan>;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    // get all plans for a user
    if (req.method === "GET") {
        const { error, data } = await getUserPlans("1234");
        if (error) {
            return res.status(500).json({ error, data });
        }
        res.status(200).json({data: data});
    }
    return res.status(405).end();
}
