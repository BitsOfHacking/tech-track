import { category } from "@/types/courseTypes";
import { Checkbox } from "./ui/checkbox"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {ChevronsLeftRight } from "lucide-react"

type SidebarProps = {
    courses: category[]
}
export default function Sidebar({ courses }: SidebarProps) {
    const courseList = courses.map((category) => {
        return (
            <div className="flex flex-col gap-1" key={category.number}>
                <p className="text-black">{category.category?.toUpperCase()}</p>
                {category.courses.map((course) => {
                    return (
                        <div className="flex gap-1" key={course.number}>
                            <Checkbox id="terms" checked={course.completed} disabled />
                                <label
                                    htmlFor="terms"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                {course.name} {course.credits}
                            </label>
                        </div>
                    )
                })}
            </div>
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
                <SheetContent side="left" className="flex flex-col gap-1 w-100" onPointerDownOutside={(e) => e.preventDefault()}>
                    <SheetHeader>
                    <SheetTitle>Degree Requirements</SheetTitle>
                    <SheetDescription>
                        {courseList}
                    </SheetDescription>
                    </SheetHeader>
                </SheetContent>
        </Sheet>
    )   
}
