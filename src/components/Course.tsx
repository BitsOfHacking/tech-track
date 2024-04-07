import { useEffect, useState } from "react";
import {
  CheckCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { category, course } from "@/types/courseTypes";
import { Handle, Position } from "reactflow";
import ReactSearchBox from "react-search-box";

interface CourseProps {
  data: {
    category: category;
    searchData: any;
  };
}

export default function Course({ data }: CourseProps) {
  const { category, searchData } = data;

  const [showCourse, setShowCourse] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(category.selectedCourse);
  const [ chosenCourse, setChosenCourse ] = useState(category.courses[0]);

  function SelectedCourse({ course }: { course: course }) {
    return (
      <div className="flex text-primary-text text-lg justify-between px-2 w-full">
        <div>{course.number}</div>
        <div className="text-secondary-text">
          {course.credits >= 0 ? course.credits : "n"}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`ml-[0.5rem] flex items-center text-center bg-primary-color rounded-[10px] w-44 min-h-[52px] course-shadow p-2 cursor-pointer`}
      onClick={() => {
        if (category.category) {
          setShowCourse(!showCourse);
        }
      }}
    >
      <Handle type="target" position={Position.Right} isConnectable={true} />
      <Handle type="source" position={Position.Left} isConnectable={true} />
      {showCourse === true && category.category ? (
        !category.freeElective ? (
          <div>
            <div className="text-xl text-primary-text mb-2">
              {category.category}
            </div>
            <div className="flex flex-col gap-2">
              {category.courses.map((course: course, index: number) => {
                return (
                  <div
                    key={course.number}
                    className="flex justify-between align-center bg-secondary-background rounded-[10px] p-2  cursor-default"
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                  >
                    <div className="flex gap-2 text-priamry-text text-lg align-middle">
                      <div
                        className="flex h-6 w-6 border-2 border-black rounded-full justify-center items-center cursor-pointer"
                        onClick={(event) => {
                          event.stopPropagation();
                          setSelectedCourse(index);
                        }}
                      >
                        {selectedCourse === index && (
                          <div>
                            <CheckCircleIcon className="h-[30px] w-[30px] stroke-black" />
                          </div>
                        )}
                      </div>
                      <div className="text-black text-sm align-middle">
                        {course.number}
                      </div>
                    </div>
                    <div className="text-sm text-secondary-text">
                      {course.credits}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div>
            <div className="text-xl text-primary-text mb-2">
              <div className="mb-2">FREE</div>
              <div
                className="flex items-center"
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                <div className="absolute color-primary-color">
                  <svg
                    className="relative ml-2"
                    width="18"
                    height="21"
                    viewBox="0 0 18 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="7.5"
                      cy="7.5"
                      r="6.5"
                      fill="white"
                      stroke="#7C87C0"
                      stroke-width="2"
                    />
                    <path
                      d="M11.6902 13.3726L16 19.5"
                      stroke="#7C87C0"
                      stroke-width="3"
                      stroke-linecap="round"
                    />
                  </svg>

                  {/* <MagnifyingGlassIcon className="relative ml-2 text-red-300 h-6 w-6 mr-1" /> */}
                </div>
                <ReactSearchBox
                  data={searchData}
                  inputFontColor={"#000000"}
                  // className="flex text-black pl-9 justify-between align-center bg-secondary-background rounded-[10px] p-2 cursor-default w-full text-sm"
                  onChange={(event: string) => {
                    setChosenCourse({
                      number: event,
                      name: "Free Elective",
                      credits: 3,
                      completed: false,
                    })
                  }}
                ></ReactSearchBox>
              </div>
            </div>
          </div>
        )
      ) : (
        <SelectedCourse
          course={
            category.category && !category.freeElective
              ? category.courses[selectedCourse]
              : chosenCourse
          }
        />
      )}
    </div>
  );
}
