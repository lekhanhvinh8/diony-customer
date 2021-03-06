import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../features/footer/footer";
import ElevationHeader from "../../features/header/elevationHeader";

export interface MainProps {}

export default function Main(props: MainProps) {
  return (
    <Fragment>
      <ElevationHeader disableElevation={false} />
      <Outlet />
      <Footer />
    </Fragment>
  );
}
