<<<<<<< HEAD
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/home/Home";
import NotFound from "./components/404/NotFound.js";

const Signup = () => <h1>Sign up</h1>;

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={Signup} />
      <Route component={NotFound} />
    </Switch>
=======
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from './components/MainLayout';
import Home from './components/Home';
import Orders from './pages/Orders';
import NotFound from './components/404/NotFound.js';

const Router = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path='/orders' component={Orders} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
>>>>>>> main
  </BrowserRouter>
);

export default Router;
