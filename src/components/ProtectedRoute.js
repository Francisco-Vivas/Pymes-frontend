import { Route, Redirect } from "react-router-dom";
import { useContextInfo } from "../hooks/auth.hooks";

const ProtectedRoute = ({ component: Component, ...props }) => {
  const { user } = useContextInfo();

  return  (
    <Route
      {...props}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
   );
};

export default ProtectedRoute;
