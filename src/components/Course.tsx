import { CheckIcon } from "@heroicons/react/24/solid";
import { category } from "@/types/courseTypes";

interface CourseProps {
  category: category
}

export default function Course({ category }: CourseProps) {
  return (
    <button
      className={`bg-primary-color border rounded-[10px] w-44 h-24`}
    >
      {category.number === 0 ?
        <div>
          {category.courses[0].number}...{category.courses[0].credits}
        </div>
        :
        <div>
          {category.category}
          <div>
            Choose {category.number}
          </div>
          {category.courses.map((course) => {
            return (
              <div className="flex justify-center align-center">
                <div className="h-6 w-6 bg-primary-button">
                  {category.selectedCourse === course.number ?
                    <div className="h-5 w-5 relative">
                      <CheckIcon />
                    </div>
                  : null }
                </div>
                {course.number}
              </div>
            )
          })}
        </div>
      }
    </button>
  )
}