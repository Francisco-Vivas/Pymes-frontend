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
import OrderDetail from './pages/OrderDetail';

const Router = () => (
  <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Layout>
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/profile/edit" component={EditProfile} />
          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
          <ProtectedRoute exact path="/profile" component={Profile} />
          <ProtectedRoute exact path="/orders" component={Orders} />
          <ProtectedRoute exact path="/orders/create-order" component={CreateOrders} />
          <ProtectedRoute exact path="/orders/:ordersID" component={OrderDetail} />
          {/* <Route exact path="*" component={NotFound} /> */}
        </Layout>
      </Switch>
  </BrowserRouter>
);

export default Router;
