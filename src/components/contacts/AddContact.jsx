import React, { useState } from "react";
import IconMail from "../icon/IconMail";
import "../../styles/contacts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AddContact = ({clbk}) => {

  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  const clearFields = () => {
    setContactName("");
    setContactEmail("");
  }

  const onContactAdd = (e) => {
    e.preventDefault();
    if (!contactName || !contactEmail) { return; }

    clbk({
      name : contactName,
      email : contactEmail
    })
    clearFields();
  }

  return (
    <>
    <form className="round-input">
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="ex: George"
              value={contactName}
              onChange={(e) => { setContactName(e.target.value) }}
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Email</label>
          <div className="control has-icons-left has-icons-right">
            <input
              className="input"
              type="email"
              placeholder="ex: george@mail.com"
              value={contactEmail}
              onChange={(e) => { setContactEmail(e.target.value) }}
              required
            />
            <span className="icon is-small is-left">
              <IconMail size="lg" />
            </span>
          </div>
        </div>
        <div className="btn-wrapper">
          <button
            type="submit"
            className="btn-add"
            onClick={onContactAdd}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
    </form>
    </>);
};

export default AddContact;
