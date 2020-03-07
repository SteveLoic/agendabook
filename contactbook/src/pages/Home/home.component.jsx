import React, { useContext, useEffect } from "react";

import AuthContext from "./../../context/auth/authContext";
import ContactList from "./../../components/contact-list/contact-list.component";
import ContactForm from "./../../components/contact-form/contact-form.component";
import ContactFilter from "./../../components/contact-filter/contact-filter.component";

const Home = () => {
  const authContext = useContext(AuthContext);

  const { loadUser } = authContext;

  useEffect(() => {
    loadUser();
    //eslint-disable-nextline
  }, []);

  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <ContactList />
      </div>
    </div>
  );
};

export default Home;
