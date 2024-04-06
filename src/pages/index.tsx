import Button from "@/components/Button";
import Course from "@/components/Course";
import Semester from "@/components/Semester";
import { category } from "@/types/courseTypes";
    
export default function Home() {
  const probability: category = {
    category: "Probability and Statistics",
    number: 2,
    courses: [
      {
        number: "MATH 3670",
        name: "Statistics and Applns",
        credits: 3
      },
      {
        number: "ISYE 3770",
        name: "Statistics and Applications",
        credits: 3
      }
    ],
    selectedCourse: 0,
  };

  const english: category = {
    number: 0,
    courses: [
      {
        number: "ENGL 1102",
        name: "English Composition 2",
        credits: 3
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
        credits: -1
      }
    ],
    selectedCourse: -1,
    freeElective: true,
  };

  const courses: category[] = [ english, probability, free ];

  return (
    // <div className={`flex min-h-screen flex-col items-center justify-between p-24`} >
    <div className="flex h-screen bg-background gap-4 justify-center items-center">
      <Semester title={"Fall 24"} courses={courses} />
      <Semester title={"Spring 24"} courses={courses} />
      <Semester title={"Spring 24"} courses={courses} />
    </div>
  );
}
