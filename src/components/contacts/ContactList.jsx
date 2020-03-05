import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faTrash } from "@fortawesome/free-solid-svg-icons";

const ContactList = ({contacts, clbk}) => {
  return (
    <div className="contacts-list">
    <h2>Your buddies</h2>
    {contacts.map((contact, i) => (
      <div className="contact-item shadow" key={i}>
        <div>{contact.name}</div>
        <div><FontAwesomeIcon icon={faAt} /> {contact.email}</div>
        <span className="contact-delete" onClick={ (e) => {clbk(i)} }><FontAwesomeIcon icon={faTrash} /> delete</span>
      </div>
    ))}
    </div>
  )
};

export default ContactList;
