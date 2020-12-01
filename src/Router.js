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
  </BrowserRouter>
);

export default Router;
