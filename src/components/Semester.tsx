import { category } from "@/types/courseTypes";
import Course from "./Course";

interface SemesterProps {
  title: string,
  courses: category[],
};

export default function Semester({ title, courses }: SemesterProps) {
  return (
    <div className="flex flex-col h-full justify-center">
      <div className="flex bg-primary-color rounded-t-[10px] h-[8%] w-48 text-2xl text-center items-center justify-center">
        {title}
      </div>
      <div className="flex flex-col bg-secondary-background rounded-b-[10px] h-[80%] w-48 py-2 gap-2 items-center">
        {courses.map((course: category) => (
          <Course category={course} />
        ))}
      </div>
    </div>
  )
}
