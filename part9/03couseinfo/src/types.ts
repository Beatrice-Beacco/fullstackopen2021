//Course types
// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseWithDescription extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CourseWithDescription {
  type: "normal";
  // description: string;
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseWithDescription {
  type: "submission";
  //description: string;
  exerciseSubmissionLink: string;
}

interface SpecialPart extends CourseWithDescription {
  type: "special";
  requirements: string[];
}

export type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | SpecialPart;
