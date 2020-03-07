import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "./../../context/auth/authContext";

const PrivateRoutingComponent = ({ component: Component, ...rest }) => {
  const authContex = useContext(AuthContext);
  const { loading, isAuthenticated } = authContex;
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated && !loading ? (
          <Redirect to="login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoutingComponent;
