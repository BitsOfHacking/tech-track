
import { useState } from "react";

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
  const [ showNewPlanModal, setShowNewPlanModal ] = useState(true);
  const [ degreeAudit, setDegreeAudit ] = useState("");

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

  const courses: category[] = [english, probability, free];

  return (
    <div
      className={`flex h-screen bg-background gap-4 justify-center items-center font-sans`}
    >
      <ReactFlowWrapper/>
      {showNewPlanModal && (
        <Modal title={"New Plan"} onClose={() => setShowNewPlanModal(false)}>
          <input
            type="file"
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
          <Button
            type="Primary"
            text="Submit"
            onClick={() => {
              console.log(degreeAudit);
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
                });
            }}
          />
        </Modal>
      )}
      <Sidebar courses={courses} />
      {/* <Semester title={"Fall 24"} courses={courses} />
      <Semester title={"Spring 24"} courses={courses} />
      <Semester title={"Spring 24"} courses={courses} /> */}
    </div>
  );
}
