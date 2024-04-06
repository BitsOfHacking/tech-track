import { category } from "@/types/courseTypes";
import Course from "./Course";
import { useEffect, useState } from "react";

interface SemesterProps {
  title: string,
  courses: category[],
};

export default function Semester({ title, courses }: SemesterProps) {
  const [ credits, setCredits ] = useState(0);

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
  })

  return (
    <div className="flex flex-col h-full justify-center">
      <div className="flex bg-primary-color rounded-t-[10px] h-[8%] w-48 text-2xl text-center items-center justify-center">
        {title}
      </div>
      <div className="relative flex flex-col bg-secondary-background rounded-b-[10px] h-[80%] w-48 py-4 gap-x-2 gap-y-4 items-center">
        {courses.map((course: category) => (
          <Course category={course} />
        ))}
        <div className="flex self-end px-4 py-2 absolute bottom-0">
          {credits} Credits
        </div>
      </div>
    </div>
  )
}
