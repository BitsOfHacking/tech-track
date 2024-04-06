// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from "@/server/db/dbConnect";
import type { NextApiRequest, NextApiResponse } from "next";
import User from "@/server/db/models/User";
type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  
  res.status(200).json({ name: "John Doe" });
}
