import * as React from "react";
import { Link } from "react-router-dom";
import PaypalButton from "../../features/checkout/paypalButton";

export interface ITestProps {}

export default function Test(props: ITestProps) {
  const array = [];
  for (let i = 0; i < 200; i++) {
    array.push(i);
  }

  return (
    <div>
      <PaypalButton />
      {array.map((e) => (
        <div>
          <Link to="/">AVC</Link>
        </div>
      ))}
    </div>
  );
}
