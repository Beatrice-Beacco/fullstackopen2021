import React from "react";
import { CoursePart } from "../types";
import Part from "./Part";

export default function Content({
  courseData,
}: {
  courseData: CoursePart[];
}): JSX.Element {
  return (
    <div>
      {courseData.map((part) => {
        return (
          <p key={part.name}>
            <Part part={part} />
          </p>
        );
      })}
    </div>
  );
}
