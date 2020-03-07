import axios from "axios";
import React, { useReducer } from "react";
import { CONTACT_ERROR, GET_CONTACTS, CLEAR_CONTACTS } from "../types";
import {
  ADD_CONTACT,
  FILTER_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  UPDATE_CONTACT,
  CLEAR_FILTER,
  CLEAR_CURRENT,
} from "./../types";
import ContactContext from "./ContactContext";
import ContactReducer from "./ContactReducer";

const ContactState = props => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  //Add contact
  const addContact = async contact => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/contacts", contact, config);
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.msg,
      });
    }
  };

  // Get Contacts

  const getContact = async () => {
    try {
      const res = await axios.get("/api/contacts");
      dispatch({ type: GET_CONTACTS, payload: res.data.contacts });
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response,
      });
    }
  };

  //Delete contact
  const deleteContact = async id => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response,
      });
    }
  };

  //update contact
  const updateCurrentContact = async contact => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );
      dispatch({ type: UPDATE_CONTACT, payload: res.data });
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.msg,
      });
    }
  };

  //Set current contact
  const setCurrentContact = contact => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  //clear contact
  const clearCurrentContact = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  //Filter contact
  const filterContact = text => {
    dispatch({ type: FILTER_CONTACT, payload: text });
  };

  //Clear Filter
  const clearFilterContact = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  //clear Contact
  const clearContact = () => {
    dispatch({ type: CLEAR_CONTACTS });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        loading: state.loading,
        addContact,
        deleteContact,
        setCurrentContact,
        clearCurrentContact,
        updateCurrentContact,
        filterContact,
        clearFilterContact,
        getContact,
        clearContact,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
