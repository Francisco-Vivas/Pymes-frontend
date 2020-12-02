import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Layout from "./components/MainLayout";
import Home from "./components/Home";
import Orders from "./pages/Orders";
import NotFound from "./components/404/NotFound.js";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

//const Signup = () => <h1>Sign up</h1>;
const EditUser = () => <h1>EditUser</h1>;

const Router = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/edit" component={EditUser} />
        <Route path="/orders" component={Orders} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default Router;
