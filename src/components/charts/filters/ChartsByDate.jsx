import React, { useState } from "react";

const ChartsByDate = ({ clbk, filterByDate }) => {
  const [activeClass, setActiveClass] = useState(filterByDate);
  const clicked = val => {
    setActiveClass(val);
  };
  return (
    <div className="buttons has-addons is-centered">
      <div
        className={
          activeClass === "last7" ? "button is-info" : "button is-basic"
        }
        onClick={() => {
          clbk("last7");
          clicked("last7");
        }}
      >
        {"<"} 7 days
      </div>
      <div
        className={
          activeClass === "last30" ? "button is-info" : "button is-basic"
        }
        onClick={() => {
          clbk("last30");
          clicked("last30");
        }}
      >
        {"<"} 30 days
      </div>
      <div
        className={
          activeClass === "last365" ? "button is-info" : "button is-basic"
        }
        onClick={() => {
          clbk("last365");
          clicked("last365");
        }}
      >
        {"<"} 365 days
      </div>
      {/*       <div
        className={
          activeClass === "alldate"
            ? "button is-info"
            : "button is-basic"
        }
        onClick={() => {
          clbk("alldate");
          clicked("alldate");
        }}
      >
        All
      </div> */}
    </div>
  );
};

export default ChartsByDate;
