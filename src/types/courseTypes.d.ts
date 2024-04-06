
interface course {
  name: string,
  number: string,
  credits: number,
}

export interface category {
  category?: string,
  number?: number,
  courses: course[],
  selectedCourse?: string,
}