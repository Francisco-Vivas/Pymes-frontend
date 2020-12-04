import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Layout from "./components/MainLayout";
import Orders from "./pages/Orders";
import NotFound from "./components/404/NotFound.js";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EditProfile from "./pages/EditProfile";
import Profile from "./pages/Profile";
import CreateOrders from "./pages/CreateOrders";
import LandingPage from "./pages/LandingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import { useContextInfo } from "./hooks/auth.hooks";

const Router = () => {
  const { user } = useContextInfo();
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={user ? Dashboard : LandingPage} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/profile/edit" component={EditProfile} />
          <ProtectedRoute exact path="/profile" component={Profile} />
          <ProtectedRoute exact path="/orders" component={Orders} />
          <ProtectedRoute
            exact
            path="/orders/create-order"
            component={CreateOrders}
          />
          {/* <Route exact path="*" component={NotFound} /> */}
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
