import { useState, useEffect } from "react";

import Button from "@/components/Button";

import { category } from "@/types/courseTypes";
import Sidebar from "@/components/Sidebar";
import Modal from "@/components/Modal";

import ReactFlowWrapper from "@/components/ReactFlowWrapper";
import { cn } from "@/lib/utils";

const probability: category = {
  category: "Probability and Statistics",
  number: 2,
  courses: [
    {
      number: "MATH 3670",
      name: "Statistics and Applns",
      credits: 3,
      completed: false,
    },
    {
      number: "ISYE 3770",
      name: "Statistics and Applications",
      credits: 3,
      completed: true,
    },
  ],
  selectedCourse: 0,
};

const english: category = {
  number: 0,
  courses: [
    {
      number: "ENGL 1102",
      name: "English Composition 2",
      credits: 3,
      completed: true,
    },
  ],
  selectedCourse: 0,
};

const free: category = {
  category: "Free Elective",
  number: 0,
  courses: [
    {
      number: "FREE",
      name: "Free Elective",
      credits: -1,
      completed: false,
    },
  ],
  selectedCourse: -1,
  freeElective: true,
};

export const courses: category[] = [english, probability, free];

export default function Home() {
  const [showNewPlanModal, setShowNewPlanModal] = useState(true);
  const [degreeAudit, setDegreeAudit] = useState("");
  const [parsedCourses, setParsedCourses]: [any[], Function] = useState([]);
  const [courseNodes, setCourseNodes]: [category[], Function] = useState([]);

  const probability: category = {
    category: "Probability and Statistics",
    number: 2,
    courses: [
      {
        number: "MATH 3670",
        name: "Statistics and Applns",
        credits: 3,
        completed: false,
      },
      {
        number: "ISYE 3770",
        name: "Statistics and Applications",
        credits: 3,
        completed: true,
      },
    ],
    selectedCourse: 0,
  };

  const english: category = {
    number: 0,
    courses: [
      {
        number: "ENGL 1102",
        name: "English Composition 2",
        credits: 3,
        completed: true,
      },
    ],
    selectedCourse: 0,
  };

  const free: category = {
    category: "Free Elective",
    number: 0,
    courses: [
      {
        number: "FREE",
        name: "Free Elective",
        credits: -1,
        completed: false,
      },
    ],
    selectedCourse: -1,
    freeElective: true,
  };

  useEffect(() => {
    const courseObjects: category[] = [];
    const takenClasses: category[] = [];
    let creditsNeeded: number = 0;

    for (const [requirement, courses] of Object.entries(parsedCourses)) {
      if (requirement != "degreeRequirements") {
        for (const course of courses) {
          if (
            !course.completed &&
            course.coursesNeeded &&
            course.title != "Lab Science Sequence Verification"
          ) {
            let numNeeded = 1;
            let totalCredits = 3;

            try {
              totalCredits = course.coursesNeeded.match(/\d+/)[0];
              numNeeded = totalCredits / 3;
            } catch (e) {
              console.log(e);
            }

            const courseOptions: string[] = course.coursesNeeded.split(" or ");

            if (courseOptions.length === 1) {
              const classTitle = courseOptions[0].split(" in ")[1];

              const newCategory: category = {
                courses: [
                  {
                    number: classTitle ? classTitle : course.title,
                    name: course.title,
                    credits: 3,
                    completed: false,
                  },
                ],
                selectedCourse: 0,
              };

              creditsNeeded += 3;
              courseObjects.push(newCategory);
            } else {
              const courseTitle: string[] = [];

              let currPrefix: string = "";
              for (let i = 0; i < courseOptions.length; i++) {
                let currTitle: string = courseOptions[i].trim();

                if (i == 0) {
                  currTitle = currTitle.split(" in ")[1];
                }

                if (/^[A-Za-z]/.test(currTitle)) {
                  currPrefix = currTitle.split(" ")[0];
                  currTitle = currTitle.split(" ")[1];
                }

                courseTitle.push(currPrefix + " " + currTitle);
              }

              const newCategory: category = {
                category: course.title,
                courses: courseTitle.map((courseNumber) => {
                  return {
                    number: courseNumber,
                    name: course.title,
                    credits: 3,
                    completed: false,
                  };
                }),
                selectedCourse: 0,
                semesterIndex: 0,
              };

              for (let i = 0; i < numNeeded; i++) {
                creditsNeeded += 3;
                courseObjects.push(newCategory);
              }
            }
          } else {
            if (course.title != "Lab Science Sequence Verification") {
              const newClass: category = {
                courses: [
                  {
                    number: course.topic ? course.topic + " " + course.number : course.name,
                    name: course.title,
                    credits: isNaN(course.credits) ? 3 : course.credits,
                    completed: true,
                  },
                ],
                selectedCourse: 0,
                semesterIndex: 0,
              };

              takenClasses.push(newClass);
            }
          }
        }
      }
    }

    const creditsLeft: number = parsedCourses["degreeRequirements"] ? parsedCourses["degreeRequirements"]["creditsRequired"] - parsedCourses["degreeRequirements"]["creditsApplied"] : 0;
    if (creditsNeeded < creditsLeft) {
      const difference: number = creditsLeft - creditsNeeded;

      for (let i = 0; i < difference; i += 3) {
        const free: category = {
          category: "Free Elective",
          courses: [
            {
              number: "FREE",
              name: "Free Elective",
              credits: 3,
              completed: false,
            },
          ],
          selectedCourse: 0,
          freeElective: true,
          semesterIndex: 0,
        };

        courseObjects.push(free);
      }
    }

    for (let i = 0; i < courseObjects.length; i++) {
      for (let j = 0; j < 5; j++) {
        courseObjects[i].semesterIndex = Math.floor(i / 5) + 1;
      }
    }

    // console.log([ ...takenClasses, ...courseObjects ]);
    setCourseNodes(() => { return [ ...takenClasses, ...courseObjects ] });
  }, [ parsedCourses ]);

  return (
    <div
      className={`flex h-screen bg-background gap-4 justify-center items-center font-sans`}
    >
      <ReactFlowWrapper courses={courseNodes} />
      {showNewPlanModal && (
        <Modal title={"New Plan"} onClose={() => setShowNewPlanModal(false)}>
          <div className="p-4 flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div className="flex flex-col items-center justify-center pt-5 pb-6 w-64">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  DegreeAudit File (.html)
                </p>
              </div>
              <input
                type="file"
                id="dropzone-file"
                className="hidden p-5"
                onChange={(event) => {
                  const fileReader = new FileReader();

                  if (event.target.files) {
                    fileReader.readAsText(event.target.files[0]);
                  }

                  fileReader.onload = function (e) {
                    setDegreeAudit(e.target?.result as string);
                  };
                }}
              ></input>
            </label>
          </div>

          <div className="w-full flex justify-end">
            <Button
              type="Primary"
              text="Submit"
              className="bg-[#748bf1] mt-4 px-8 rounded-lg text-white"
              onClick={() => {
                fetch("/api/parse", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ degreeAudit: degreeAudit }),
                })
                  .then((res) => res.json())
                  .then((data: any) => {
                    console.log({ data });
                    setParsedCourses(data);
                    setShowNewPlanModal(false);
                  });
              }}
            />
          </div>
        </Modal>
      )}
      <Sidebar courses={parsedCourses} />
    </div>
  );
}
