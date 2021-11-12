import * as React from "react";
import { Link } from "react-router-dom";

export interface ITestProps {}

export default function Test(props: ITestProps) {
  const array = [];
  for (let i = 0; i < 200; i++) {
    array.push(i);
  }

  return (
    <div>
      {array.map((e) => (
        <div>
          <Link to="/">AVC</Link>
        </div>
      ))}
    </div>
  );
}
