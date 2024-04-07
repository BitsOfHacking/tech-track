import { category } from "@/types/courseTypes";
import Course from "./Course";
import { useEffect, useState } from "react";

interface SemesterProps {
  data: {
    title: string;
    courses: category[];
  }
}

export default function Semester({ data }: SemesterProps) {
  const { title, courses } = data;

  const [credits, setCredits] = useState(0);

  useEffect(() => {
    let credits = 0;

    for (let i = 0; i < courses.length; i++) {
      if (courses[i].category) {
        credits += 3;
      } else {
        credits += courses[i].courses[0].credits;
      }
    }

    setCredits(credits);
  }, [courses]);

  return (
    <div className="h-screen flex flex-col justify-center text-white">
      <div className="flex bg-semester-header-background rounded-t-[10px] pt-2 pb-2 h-[8%] w-48 text-2xl text-center items-center justify-center">
        {title}
      </div>
      <div className="grow shadow-semester relative flex flex-col bg-secondary-background rounded-b-[10px] h-[80%] w-48 py-4 gap-x-2 gap-y-8 items-center">
        {/* {courses.map((course: category) => (
          <Course key={course.number} category={course} />
        ))} */}
        <div className="absolute bottom-0 mb-2 text-black flex self-end px-4">{credits} Credits</div>
      </div>
    </div>
  );
}
