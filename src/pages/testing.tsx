import Button from "@/components/Button";
import Course from "@/components/Course";
import Semester from "@/components/Semester";
import { category } from "@/types/courseTypes";

export default function Testing() {
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
    selectedCourse: "MATH 3670"
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
  };

  const courses: category[] = [ english, probability ];

  return (
    <div className="h-screen bg-background">
      <div>hey there</div>
      <Button type="plus" onClick={() => console.log("amongus")} />
      <Button type="primary" text="lol" onClick={() => console.log("amongus")} />
      <Button type="secondary" text="lol" onClick={() => console.log("amongus")} />
      <Course category={english} />
      <Course category={probability} />
      <Semester courses={courses} />
    </div>
  )
}