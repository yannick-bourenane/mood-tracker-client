import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      Sorry - Error 404
      <br />
      Go back to the &nbsp;<Link to="/">home page</Link>
    </div>
  );
}
