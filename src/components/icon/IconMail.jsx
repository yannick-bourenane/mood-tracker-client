import React from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const IconMail = ({ size = "1x" }) => (
  <FontAwesomeIcon title="Mail" size={size} icon={faEnvelope} />
);

export default withRouter(IconMail);
