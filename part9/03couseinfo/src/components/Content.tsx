import React from "react";
import { PartInfo } from "../types";

export default function Content({
  courseData,
}: {
  courseData: PartInfo[];
}): JSX.Element {
  return (
    <div>
      {courseData.map((part) => {
        return (
          <p>
            {part.name} {part.exerciseCount}
          </p>
        );
      })}
    </div>
  );
}
