import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useContextInfo } from "../hooks/auth.hooks";

const ProtectedRoute = ({ component: Component, ...props }) => {
  const { user } = useContextInfo();
  const [currentUser, setCurrentUser] = useState(false);

  // useEffect(() => {
  //   if (!currentUser) setCurrentUser(!currentUser);
  // }, [currentUser]);

  console.log(user);
  return user ? (
    <Route {...props} component={Component} />
  ) : !currentUser ? (
    setCurrentUser(!currentUser)
  ) : (
    currentUser && <Redirect to="/login" />
  );

  // return  (
  //   <Route
  //     {...props}
  //     render={(props) =>
  //       user ? <Component {...props} /> : <Redirect to="/login" />
  //     }
  //   />
  // );
};

export default ProtectedRoute;
