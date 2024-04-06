// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { promises as fs } from 'fs';
import parse from "node-html-parser";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  fs.readFile(process.cwd() + '/public/degreeaudit.html', { encoding: 'utf-8' })
    .then(data => {
      // console.log(data);
      const root = parse(data);

      





      res.status(200).json({data: data});
    })

  // console.log("handling");


  // res.status(200).json({ name: "John Doe" });
}
