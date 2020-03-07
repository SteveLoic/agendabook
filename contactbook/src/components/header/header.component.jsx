import React, { useContext, Fragment } from "react";
import PropTypes from "prop-types";
import AuthContext from "../../context/auth/authContext";
import ContactContext from "../../context/contacts/ContactContext";

import { Link } from "react-router-dom";

const Header = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);
  const { isAuthenticated, user, logout } = authContext;
  const { clearContact } = contactContext;

  const onLogout = () => {
    clearContact();
    logout();
  };

  const authLink = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <a onClick={onLogout} href="#!">
          <i className="fa fa-sign-out"></i>{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </Fragment>
  );
  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/Register">register</Link>
      </li>
      <li>
        <Link to="/Login">Login</Link>
      </li>
    </Fragment>
  );
  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>{isAuthenticated ? authLink : guestLinks}</ul>
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

Header.defaultProps = {
  title: "Contact Book",
  icon: "fa fa-id-card"
};

export default Header;
