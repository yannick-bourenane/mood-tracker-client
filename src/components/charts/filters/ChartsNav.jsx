import React, { useState } from "react";

const ChartsNav = ({ clbk }) => {
  const [activeClass, setActiveClass] = useState("moodscore");
  const clicked = val => {
    setActiveClass(val);
  };
  return (
    <div className="buttons is-centered">
      <div
        className={
          activeClass === "moodscore" ? "button is-info" : "button is-basic"
        }
        onClick={() => {
          clbk("moodscore");
          clicked("moodscore");
        }}
      >
        Calendar
      </div>
      <div
        className={
          activeClass === "keyword" ? "button is-info" : "button is-basic"
        }
        onClick={() => {
          clbk("keyword");
          clicked("keyword");
        }}
      >
        Keywords
      </div>
    </div>
  );
};

export default ChartsNav;
