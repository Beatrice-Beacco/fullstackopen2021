import React from "react";
import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default function Part({ part }: { part: CoursePart }): JSX.Element {
  switch (part.type) {
    case "normal":
      return (
        <div>
          <b>{part.name}</b>
          <br />
          {part.exerciseCount}
          <br />
          {part.description}
        </div>
      );

    case "groupProject":
      return (
        <div>
          <b>{part.name}</b>
          <br />
          {part.exerciseCount}
          <br />
          {part.groupProjectCount}
        </div>
      );

    case "submission":
      return (
        <div>
          <b>{part.name}</b>
          <br />
          {part.exerciseCount}
          <br />
          {part.description}
          <br />
          {part.exerciseSubmissionLink}
        </div>
      );

    case "special":
      return (
        <div>
          <b>{part.name}</b>
          <br />
          {part.exerciseCount}
          <br />
          {part.description}
          <br />
          {part.requirements.join(", ")}
        </div>
      );

    default:
      return assertNever(part);
  }
}
