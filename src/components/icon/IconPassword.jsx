import React from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";

const IconPassword = ({ size = "1x" }) => (
  <FontAwesomeIcon title="Password" size={size} icon={faKey} />
);

export default withRouter(IconPassword);
