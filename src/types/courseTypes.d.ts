
interface course {
  name: string,
  number: string,
  credits: number,
  completed: boolean,
}

export interface category {
  category?: string,
  number?: number,
  courses: course[],
  selectedCourse: number,
  freeElective?: boolean,
}