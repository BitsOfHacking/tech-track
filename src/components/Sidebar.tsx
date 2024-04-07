import { category } from "@/types/courseTypes";
import { Checkbox } from "./ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronsLeftRight } from "lucide-react";

type SidebarProps = {
  courses: any[];
};

const convertToTitleCase = (str: string) => {
  const result = str.replace(/([A-Z])/g, " $1");
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);

  return finalResult;
};

export default function Sidebar({ courses }: SidebarProps) {
  console.log(courses);

  const courseList = Object.entries(courses).map(([category, values]) => {
    console.log({ category, values });

    if (category === "degreeRequirements") {
      return (
        <h1 key={category} className="text-2xl">
          <div className="text-md">
            Credits Required: {values["creditsRequired"]}
          </div>
          <div className="text-md">
            Credits Applied: {values["creditsApplied"]}
          </div>
        </h1>
      );
    }

    return (
      <>
        <h1 className="text-2xl">{convertToTitleCase(category).toUpperCase()}</h1>
        {values.map((elem) => {
          if (elem.title) {
            return (
              <h2 key={elem.title}>
                <div className="text-md">
                  <div className="flex gap-1 py-2">
                    <Checkbox id="terms" checked={elem.completed} disabled />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {elem.topic} {elem.number}: {elem.title}, {elem.credits}
                    </label>
                  </div>
                </div>
              </h2>
            );
          } else if (elem.name) {
            return (
              <>
                <h2 className="text-md">{elem.name}</h2>
                {elem.courses.map((course) => {
                  return (
                    <h2 key={course.title}>
                      <div className="text-md">
                        <div className="flex gap-1 py-2">
                          <Checkbox
                            id="terms"
                            checked={course.completed}
                            disabled
                          />
                          <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {course.name} {course.credits}
                          </label>
                        </div>
                      </div>
                    </h2>
                  );
                })}
              </>
            );
          }

          console.log({ elem });

          return <></>;
        })}
      </>
    );
  });

  return (
    <Sheet modal={false}>
      <SheetTrigger>
        <div className="absolute top-4 left-4 rounded-md opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none p-1 border-2 border-gray-200">
          <ChevronsLeftRight className="h-5 w-5" />
          <span className="sr-only">Open</span>
        </div>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex flex-col gap-1 w-100"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <SheetHeader>
          <SheetTitle>Degree Requirements</SheetTitle>
          <SheetDescription>{courseList}</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
