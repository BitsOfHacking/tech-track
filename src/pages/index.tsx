import { category } from "@/types/courseTypes";
import Sidebar from "@/components/Sidebar";

import { Nunito as FontSans } from "next/font/google";
import ReactFlowWrapper from "@/components/ReactFlowWrapper";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

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
  return (
    <div
      className={`${fontSans.variable} flex h-screen bg-background gap-4 justify-center items-center font-sans`}
    >
      <ReactFlowWrapper />
      <Sidebar courses={courses} />
      {/* <Semester title={"Fall 24"} courses={courses} />
      <Semester title={"Spring 24"} courses={courses} />
      <Semester title={"Spring 24"} courses={courses} /> */}
    </div>
  );
}
