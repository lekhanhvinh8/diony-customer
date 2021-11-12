import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import ElevationHeader from "./elevationHeader";

export interface MainProps {}

export default function Main(props: MainProps) {
  return (
    <Fragment>
      <ElevationHeader disableElevation={false} />
      <Outlet />
    </Fragment>
  );
}
