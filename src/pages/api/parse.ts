// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { promises as fs } from "fs";
import parse, { HTMLElement, TextNode } from "node-html-parser";

type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  fs.readFile(process.cwd() + "/public/degreeaudit.html", {
    encoding: "utf-8",
  }).then((data) => {
    const root = parse(data, {
      voidTag: {
        tags: [
          "area",
          "base",
          "br",
          "col",
    // console.log(data);
          "embed",
          "hr",
          "img",
          "input",
          "link",
          "meta",
          "param",
          "source",
          "track",
          "wbr",
          "script",
          "style",
        ],
        closingSlash: true,
      },
      blockTextElements: {
        style: true,
        script: true,
        pre: true,
      },
    });

    const main = root.getElementsByTagName("main")[0];

    const container =
      main.childNodes[0].childNodes[2].childNodes[0].childNodes[1].childNodes[0]
        .childNodes[0];

    let sections: any = {};

    container.childNodes
      .splice(3, container.childNodes.length)
      .forEach((childNode) => {
        if (childNode.childNodes.length > 0) {
          let name =
            childNode.childNodes[0].parentNode.querySelector("h2")?.firstChild
              ?.innerText;
          const table =
            childNode.childNodes[0].parentNode.querySelector("table");

          // Filter name
          if (name !== undefined) {
            const split = name.split("-");

            name = split[split.length - 1]
              .trim()
              .toLowerCase()
              .replaceAll(" ", "-");
          }

          if (name !== null && table !== null) {
            const body = table.lastChild!;

            let properties = [];

            for (const row of body.childNodes) {
              properties.push(row);
            }

            sections[name as string] = properties;
          }
        }
      });

    if (sections["core-requirements"]) {
      res
        .status(200)
        .json({ data: parseCoreRequirement(sections["core-requirements"]) });
    }

    res.status(200).json({ data: { a: "wadaw" } });
  });
}

enum CoreArea {
  A_ESSENTIAL_SKILLS,
  B_INSTITUTIONAL_OPTIONS,
  C_HUMANITIES,
  D_SCIENCE_MATH_TECH,
  E_SOCIAL_SCIENCES,
  F_COURSES_RELATED_TO_MAJOR,
  ETHICS,
}

type CoreRequirementElement = {
  label: string;
  courseId: string;
  courseTitle: string;
};

function parseCoreRequirement(coreRequirementList: Node[]) {
  // First node will be an icon and the label
  // tbody > tr (0) > th (0) > div (0) > div (1) > p (0)
  let parsedCourses: any = [];

  let currentGroup:
    | (
        | {
            courseName: string | null;
            coursesNeeded: string | null;
            courseID?: undefined;
          }
        | {
            courseName: string | null;
            courseID: string | null;
            coursesNeeded?: undefined;
          }
      )[]
    | null = null;
  let current = 0;
  let desired = 0;

  coreRequirementList.forEach((node, index) => {
    const labelNode: ChildNode =
      node?.childNodes[0]?.childNodes[0]?.childNodes[1]?.childNodes[0];

    let label = "";

    labelNode?.childNodes.forEach((childNode) => {
      if (childNode instanceof TextNode) {
        label += childNode.text;
      }
    });

    if (!label) {
      if (currentGroup === null) return;
    }

    if (node instanceof HTMLElement) {
      let rowspan = node.querySelector("th")?.attributes["rowspan"];

      if (rowspan !== undefined && parseInt(rowspan) > 1) {
        currentGroup = [];
        current = 0;
        desired = parseInt(rowspan);
      }
    }

    const courseNode = node?.childNodes[label ? 1 : 0]?.childNodes[0];
    if (!courseNode) return;

    const course = courseNode.textContent;

    let newCourse;

    if (course?.toLowerCase().includes("satisfied by")) {
      if (!label) {
        current++;
        return;
      }
    }

    if (course?.toLowerCase().includes("still needed")) {
      // classes still needed for this category
      const classesNeeded = node?.childNodes[label ? 2 : 1]?.textContent;

      newCourse = {
        courseName: label,
        coursesNeeded: classesNeeded,
      };
    } else {
      newCourse = {
        courseName: label,
        courseID: course,
      };
    }

    if (currentGroup !== null) {
      currentGroup.push(newCourse);
      current++;

      if (current === desired - 1) {
        current = 0;
        desired = 0;

        if (currentGroup.length === 1) {
          parsedCourses.push(currentGroup[0]);
        } else {
          parsedCourses.push(currentGroup);
        }

        currentGroup = null;
      }
    } else {
      parsedCourses.push(newCourse);
    }
  });

  return parsedCourses;
}
