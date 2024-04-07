import { category } from "@/types/courseTypes";
import Course from "./Course";
import { useEffect, useState } from "react";
import Button from "./Button";

interface SemesterProps {
  data: {
    title: string;
    courses: category[];
    credits?: number;
  };
}

export default function Semester({ data }: SemesterProps) {
  const { title, courses, credits } = data;

  // const [credits, setCredits] = useState(0);

  // useEffect(() => {
  //   if (!courses) {
  //     return;
  //   }

  //   let credits = 0;

  //   for (let i = 0; i < courses.length; i++) {
  //     if (courses[i].category) {
  //       credits += 3;
  //     } else {
  //       credits += courses[i].courses[0].credits;
  //     }
  //   }

  //   setCredits(credits);
  // }, [courses]);

  return (
    <div className="h-screen flex flex-col justify-center text-white">
      <div
        className={`flex ${
          title === "Transfer"
            ? "bg-[#5dc191]"
            : "bg-semester-header-background"
        } rounded-t-[10px] pt-2 pb-2 h-[8%] w-48 text-2xl text-center items-center justify-center`}
      >
        {title}
      </div>
      <div className="grow shadow-semester relative flex flex-col bg-secondary-background rounded-b-[10px] h-[80%] w-48 py-4 gap-x-2 gap-y-8 items-center">
        {/* {courses.map((course: category) => (
          <Course key={course.number} category={course} />
        ))} */}

        <div className="w-full items-center justify-between absolute bottom-0 mb-2 text-black flex self-end px-4">
          <Button
            type="plus"
            onClick={() => {
              console.log("ahhhh");
            }}
          />
          <div className="align-middle">{credits ? credits : 0} Credits</div>
        </div>
      </div>
    </div>
  );
}