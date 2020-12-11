import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Layout from "./components/MainLayout";
import Orders from "./pages/Orders/Orders";
import NotFound from "./components/404/NotFound.js";
import Login from "./pages/User/Login";
import Signup from "./pages/User/Signup";
import EditProfile from "./pages/User/EditProfile";
import Profile from "./pages/User/Profile";
import CreateOrders from "./pages/Orders/CreateOrders";
import CreateClients from "./pages/Clients/CreateClients";
import CreateSupplier from "./pages/Suppliers/CreateSupplier";
import LandingPage from "./pages/LandingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import OrderDetail from "./pages/Orders/OrderDetail";
import SupplierDetail from "./pages/Suppliers/SupplierDetail";
import EditOrder from "./pages/Orders/EditOrder";
import EditSupplier from "./pages/Suppliers/EditSupplier";
import UpdateClient from "./pages/Clients/EditClients";
import Suppliers from "./pages/Suppliers/Suppliers";
import Clients from "./pages/Clients/Clients";
import { useContextInfo } from "./hooks/auth.hooks";
import Products from "./pages/Products/Products";
import ProductDetail from "./pages/Products/ProductDetail";
import FormProduct from "./components/FromProduct";
import Analytics from "./pages/Analytics";

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
          <ProtectedRoute
            exact
            path="/orders/:ordersID/edit"
            component={EditOrder}
          />
          <ProtectedRoute
            exact
            path="/orders/:ordersID"
            component={OrderDetail}
          />
          <ProtectedRoute exact path="/suppliers" component={Suppliers} />
          <ProtectedRoute
            exact
            path="/suppliers/create-supplier"
            component={CreateSupplier}
          />
          <ProtectedRoute
            exact
            path="/suppliers/:suppliersID"
            component={SupplierDetail}
          />
          <ProtectedRoute
            exact
            path="/suppliers/:suppliersID/edit"
            component={EditSupplier}
          />
          <ProtectedRoute exact path="/clients" component={Clients} />
          <ProtectedRoute
            exact
            path="/clients/create-client"
            component={CreateClients}
          />
          <ProtectedRoute
            exact
            path="/clients/:clientsID/edit"
            component={UpdateClient}
          />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/create"
            component={() => <FormProduct isNew={true} />}
          />
          <ProtectedRoute
            exact
            path="/products/:productID/edit"
            component={(props) => <FormProduct isNew={false} {...props} />}
          />
          <ProtectedRoute
            exact
            path="/products/:productID"
            component={ProductDetail}
          />
          <ProtectedRoute exact path="/analytics" component={Analytics} />
          {/* <Route exact path="*" component={NotFound} /> */}
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
