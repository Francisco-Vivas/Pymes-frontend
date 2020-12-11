import { Route, Redirect } from "react-router-dom";
import { useContextInfo } from "../hooks/auth.hooks";
import { currentUserFn } from "../services/auth";

const ProtectedRoute = ({ component: Component, ...props }) => {
  const { user } = useContextInfo();
  let userGet = true;
  async function test() {
    userGet = await currentUserFn();
  }

  return (
    <Route
      {...props}
      render={(props) =>
        userGet && user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectedRoute;
