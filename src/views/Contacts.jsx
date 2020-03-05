import React, { useState, useEffect } from "react";
import APIHandler from "../api/APIHandler";
import IconMail from "../components/icon/IconMail";
import "../styles/contacts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import AddContact from "../components/contacts/AddContact";
import ContactList from "../components/contacts/ContactList";

const Contacts = () => {

  const [contacts, setContacts] = useState([]);
  const [errorMsg, setErrorMessage] = useState("");

  // First load
  useEffect(() => {
    APIHandler.get("/contacts")
    .then(apiRes => {
      setContacts(apiRes.data)
    }).catch(err => console.log(err))
    return () => {};
  }, [])

  const onContactAdd = (contact) => {
    APIHandler.post("/contacts/new", contact)
    .then(apiRes => {
      setContacts([...contacts, apiRes.data])
    }).catch((error) => {
      if ( error.response.data.msg ) {
        setErrorMessage(error.response.data.msg)
        setTimeout(() => { setErrorMessage('') }, 2000)
      }
    })
  }

  const onContactDelete = (contactIndex) => {
    const c = contacts[contactIndex];
    APIHandler.delete("/contacts", c._id)
    .then(apiRes => {
      console.log("apiRes : ", apiRes)
      setContacts( contacts.filter((c,i) => { return i != contactIndex } ) )
    }).catch(err => console.log(err))
  }

  return (
    <div className="page contacts-page flex-center-column">

      <div className="content-wrapper">
        {errorMsg && <div className="notification is-danger">{errorMsg}</div>}

        <h1>Manage Buddies</h1>

        <p>Who do you want to talk to when you're feeling down? Who can cheer you up? Add them here! </p>

        <AddContact clbk={onContactAdd} />

        {contacts.length === 0 ? (
          <div className="contacts-loader">No contacts...</div>
        ) : (
          <ContactList contacts={contacts} clbk={onContactDelete} />
        )}
      </div>
    </div>
  );
};

export default Contacts;
