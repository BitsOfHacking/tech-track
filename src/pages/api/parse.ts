// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { promises as fs } from "fs";
import parse, { HTMLElement, TextNode } from "node-html-parser";
import { CoreType, ICourse } from "@/server/db/models/Course";

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

            let properties: any[] = [];

            body.childNodes.forEach((bodyChildNode) =>
              properties.push(bodyChildNode)
            );

            sections[name as string] = properties;
          }
        }
      });

    const majorRequirements = parseSection(
      sections["major-requirements"],
      CoreType.MAJOR_REQUIREMENTS
    );
    const coreRequirements = parseSection(sections["core-requirements"]);
    const electives = parseSection(
      sections["electives"],
      CoreType.MAJOR_ELECTIVES
    );

    if (sections["core-requirements"]) {
      res.status(200).json({
        "major-requirements": majorRequirements,
        "core-requirements": coreRequirements,
        "elective-requirements": electives,
      });
    }

    res.status(200).json({ data: { a: "wadaw" } });
  });
}

function parseSection(section: Node[], defaultCoreType?: CoreType) {
  defaultCoreType = defaultCoreType || CoreType.CORE_UNKNOWN;

  return parseCoreRequirement(section, defaultCoreType);
}

interface ICourseGroup {
  name: string;
  courses: ICourse[];
}

function parseCoreRequirement(
  coreRequirementList: Node[],
  defaultCoreType: CoreType
) {
  // First node will be an icon and the label
  // tbody > tr (0) > th (0) > div (0) > div (1) > p (0)
  let parsedCourses: (ICourse | ICourseGroup)[] = [];
  let currentGroup: ICourseGroup | null = null;
  let currentGroupName = "";
  let current = 0;
  let desired = 0;

  let currentCoreType = defaultCoreType || CoreType.CORE_UNKNOWN;

  coreRequirementList.forEach((node, index) => {
    const labelNode: ChildNode =
      node?.childNodes[0]?.childNodes[0]?.childNodes[1]?.childNodes[0];

    let label = "";

    if (labelNode?.textContent?.includes("CORE")) {
      const coreAreaParseRegex = /CORE AREA ([A-Z]) -/;
      const match = labelNode.textContent.match(coreAreaParseRegex);

      if (match && match[1]) {
        const letter = match[1];
        const coreString = "CORE_" + letter;

        currentCoreType =
          CoreType[coreString as keyof typeof CoreType] ||
          CoreType.CORE_UNKNOWN;
      }
    }

    labelNode?.childNodes.forEach((childNode) => {
      if (childNode instanceof TextNode) {
        label += childNode.text;
      }
    });

    let completed = false;

    if (labelNode && labelNode.textContent) {
      completed = labelNode.textContent?.includes("is complete");
    } else {
      if (!label) {
        if (currentGroup === null) return;
      }
    }

    if (node instanceof HTMLElement) {
      let rowspan = node.querySelector("th")?.attributes["rowspan"];

      if (rowspan !== undefined && parseInt(rowspan) > 1) {
        currentGroup = {
          name: label,
          courses: [],
        };
        currentGroupName = label;
        current = 0;
        desired = parseInt(rowspan);
      }
    }

    const courseNode = node?.childNodes[label ? 1 : 0]?.childNodes[0];
    if (!courseNode) return;

    const course = courseNode.textContent;

    let newCourse: any;

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
        title: label,
        coursesNeeded: classesNeeded?.trim() || "",
        core: currentCoreType,
      };
    } else {
      const split = course?.trim().split(" ");

      let credits = -1;

      if (node.childNodes[label ? 4 : 3]) {
        const creditNode = node.childNodes[label ? 4 : 3].childNodes[0];

        if (creditNode && creditNode.textContent) {
          credits = parseInt(
            creditNode.textContent.replaceAll("(", "").replaceAll(")", "")
          );
        }
      }

      if (credits === -1) {
        return;
      }

      // Attempt to grab label if nested
      if (!label || (currentGroup !== null && current === 0)) {
        label = node.childNodes[1].childNodes[0].textContent || "";
      }

      newCourse = {
        title: label,
        topic: split ? split[0] : "INVALID",
        number: split ? parseInt(split[1]) : -1,
        credits: credits,
        core: [currentCoreType],
        completed: completed,
      };
    }

    if (currentGroup !== null) {
      currentGroup.courses.push(newCourse);
      current++;

      if (current === desired - 1) {
        current = 0;
        desired = 0;

        if (currentGroup.courses.length === 1) {
          parsedCourses.push(currentGroup.courses[0]);
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
