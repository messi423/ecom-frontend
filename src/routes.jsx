import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import ProductList from "./components/productList";
import ProductDetail from "./components/productDetail";
import CartView from "./components/cart";
import WrappedForm from "./components/checkout";
import ProfileView from "./components/profile";

const BaseRouter = (props) => {
  return (
    <div>
      <Switch>
        <Route path="/checkout" component={WrappedForm} />
        <Route path="/article/:articleId" component={ProductDetail} />
        <Route exact path="/" component={ProductList} />
        <Route path="/cart" component={CartView} />
        <Route path="/profile" component={ProfileView} />
      </Switch>
    </div>
  );
};

export default BaseRouter;
