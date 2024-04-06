import { CheckIcon } from "@heroicons/react/24/solid";
import { category } from "@/types/courseTypes";

interface CourseProps {
  category: category
}

export default function Course({ category }: CourseProps) {
  return (
    <button
      className={`bg-primary-color rounded-[10px] w-44 min-h-[52px] course-shadow p-2`}
    >
      {category.category ?
        <div>
          <div className="mb-2">
            {category.category}
          </div>
          <div className="flex flex-col gap-2">
            {category.courses.map((course) => {
              return (
                <div className="flex justify-center align-center bg-secondary-background rounded-[10px] gap-2 py-2">
                  <div className="flex h-6 w-6 bg-secondary-color  border-2 border-primary-color rounded-full justify-center items-start">
                    {category.selectedCourse === course.number ?
                      <div className="h-6 w-6 stroke-background stroke-2">
                        <CheckIcon />
                      </div>
                    : null }
                  </div>
                  {course.number}
                </div>
              )
            })}
          </div>
        </div>
        :
        <div>
          {category["courses"][0]["number"]}...{category["courses"][0]["credits"]}
        </div>
      }
    </button>
  )
}