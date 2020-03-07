import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";

import Alert from "./components/alert/alert.component";
import Header from "./components/header/header.component";
import PrivateRouting from "./components/routing/private-routing.component";
import About from "./pages/About/about.component";
import Home from "./pages/Home/home.component";
import Login from "./pages/Login/login.component";
import Register from "./pages/Register/register.component";

function App() {
  return (
    <Fragment>
      <Header />
      <Alert />
      <div className="container">
        <Switch>
          <PrivateRouting exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
    </Fragment>
  );
}

export default App;
