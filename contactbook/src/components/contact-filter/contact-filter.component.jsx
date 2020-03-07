import React, { useContext, useRef, useEffect } from "react";

import ContactContext from "./../../context/contacts/ContactContext";
const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const { filterContact, clearFilterContact, filtered } = contactContext;
  const text = useRef("");

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  }, []);

  const onChange = event => {
    if (text.current.value !== "") {
      filterContact(event.target.value);
    } else {
      clearFilterContact();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type="text"
        placeholder="Filter Contacts ..."
        onChange={onChange}
      />
    </form>
  );
};

export default ContactFilter;
