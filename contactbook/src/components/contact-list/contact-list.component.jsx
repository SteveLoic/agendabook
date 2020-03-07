import React, { useEffect, useContext, Fragment } from "react";
import ContactItem from "./../contact-item/contact-item";
import ContactContext from "./../../context/contacts/ContactContext";
import Spinner from "./../spinner/Spinner";

const ContactList = () => {
  const contactContext = useContext(ContactContext);
  const { getContact, loading, contacts, filtered } = contactContext;
  useEffect(() => {
    getContact();
  }, []);

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please add a Contact</h4>;
  }

  return (
    <Fragment>
      {contacts !== null && !loading ? (
        <Fragment>
          {filtered !== null
            ? filtered.map(contact => (
                <ContactItem key={contact._id} contact={contact} />
              ))
            : contacts.map(contact => (
                <ContactItem key={contact._id} contact={contact} />
              ))}
        </Fragment>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default ContactList;
