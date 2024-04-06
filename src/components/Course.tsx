import { useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { category, course } from "@/types/courseTypes";

interface CourseProps {
  category: category
}

export default function Course({ category }: CourseProps) {
  const [ showCourse, setShowCourse ] = useState(true);
  const [ selectedCourse, setSelectedCourse ] = useState(category.selectedCourse);

  function SelectedCourse({ course }: { course: course }) {
    return (
      <div className="flex text-primary-text text-lg justify-between px-2">
        <div>{course.number}</div>
        <div className="text-secondary-text">{course.credits}</div>
      </div>
    )
  }

  return (
    <button
      className={`bg-primary-color rounded-[10px] w-44 min-h-[52px] course-shadow p-2`}
      onClick={() => {
        if (category.category) {
          setShowCourse(!showCourse);
        }
      }}
    >
      {showCourse === true && category.category ?
        <div>
          <div className="text-xl text-primary-text mb-2">
            {category.category}
          </div>
          <div className="flex flex-col gap-2">
            {category.courses.map((course: course, index: number) => {
              return (
                <div
                  className="flex justify-between align-center bg-secondary-background rounded-[10px] p-2  cursor-default"
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                >
                  <div className="flex gap-2 text-priamry-text text-lg">
                    <button
                      className="flex h-6 w-6 border-2 border-primary-text rounded-full justify-center items-center"
                      onClick={(event) => {
                        event.stopPropagation();
                        setSelectedCourse(index);
                      }}
                    >
                      {selectedCourse === index && (
                        <div className="">
                          <CheckCircleIcon className="h-[30px] w-[30px] stroke-primary-text" />
                        </div>
                      )}
                    </button>
                    <div className="text-primary-text text-sm">
                      {course.number}
                    </div>
                  </div>
                  <div className="text-sm text-secondary-text">
                    {course.credits}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        :
        <SelectedCourse course={category.category ? category.courses[selectedCourse] : category.courses[0]} />
      }
    </button>
  )
}