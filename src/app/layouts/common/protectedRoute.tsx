import React from "react";
// import { Route, Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import auth from "../../services/authService";

interface Props {
  path: string;
  [key: string]: any;
}

const ProtectedRoute: React.FC<Props> = ({ path, ...rest }) => {
  const user = auth.getCurrentUser();
  return <Route path={path} {...rest} />;

  // if (user) return <Route path={path} {...rest} />;
  // return (
  //   <Route
  //     render={(props) => (
  //       <Redirect
  //         to={{ pathname: "/login", state: { from: props.location } }}
  //       />
  //     )}
  //   />
  // );
};

export default ProtectedRoute;
