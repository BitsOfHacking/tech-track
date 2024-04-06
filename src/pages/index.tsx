import Button from "@/components/Button";
import Course from "@/components/Course";
import Semester from "@/components/Semester";
import { category } from "@/types/courseTypes";
import Sidebar from "@/components/Sidebar";

import { Nunito as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function Home() {
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
      className={`${fontSans.variable} flex h-screen bg-background gap-4 justify-center items-center font-sans`}
    >
      <Sidebar courses={courses} />
      <Semester title={"Fall 24"} courses={courses} />
      <Semester title={"Spring 24"} courses={courses} />
      <Semester title={"Spring 24"} courses={courses} />
    </div>
  );
}
