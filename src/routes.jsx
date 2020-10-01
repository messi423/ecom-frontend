import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import ProductList from "./components/productList";
import ProductDetail from "./components/productDetail";
import CartView from "./components/cart";
import InjectedCheckoutForm from "./components/checkout";

const BaseRouter = (props) => {
  return (
    <div>
      <Switch>
        <Route path="/checkout" component={InjectedCheckoutForm} />
        <Route path="/article/:articleId" component={ProductDetail} />
        <Route exact path="/" component={ProductList} />
        <Route path="/cart" component={CartView} />
      </Switch>
    </div>
  );
};

export default BaseRouter;
