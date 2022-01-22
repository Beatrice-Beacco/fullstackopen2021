import React from "react";

export default function Header({ name }: { name: string }): JSX.Element {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
}
