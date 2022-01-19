import React from "react";
import { PartInfo } from "../types";

export default function Total({ parts }: { parts: PartInfo[] }): JSX.Element {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  );
}
