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
          <div className="text-xl text-primary-text mb-2">
            {category.category}
          </div>
          <div className="flex flex-col gap-2">
            {category.courses.map((course) => {
              return (
                <div className="flex justify-between align-center bg-secondary-background rounded-[10px] p-2">
                  <div className="flex gap-2 text-priamry-text text-lg">
                    <div className="flex h-6 w-6 bg-secondary-color border-2 border-primary-color rounded-full justify-center items-start">
                      {category.selectedCourse === course.number ?
                        <div className="h-6 w-6 stroke-background stroke-2">
                          <CheckIcon />
                        </div>
                      : null }
                    </div>
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
        <div className="flex text-primary-text text-lg justify-between px-2">
          <div>{category["courses"][0]["number"]}</div>
          <div className="text-secondary-text">{category["courses"][0]["credits"]}</div>
        </div>
      }
    </button>
  )
}