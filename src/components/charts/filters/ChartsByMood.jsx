import React, { useState, useEffect } from "react";
import moodScale from "../../../data/mood_scale";
import "../../../styles/css library/wickedcss.min.css";

const ChartsByMood = ({
  clbk,
  filterByMood,
  clbkCheck,
  toggleFilter,
  isChecked,
  handleEggPosition,
  eggPosition
}) => {
  const [sliderValue, setSliderValue] = useState(filterByMood);
  const [movingEgg, setMovingEgg] = useState(eggPosition);
  const leftValue = [
    "0%",
    "10%",
    "19%",
    "28%",
    "37.5%",
    "46.7%",
    "55.7%",
    "65%",
    "74%",
    "83%",
    "92%"
  ];
  const sliderChange = moodscore => {
    setSliderValue(moodscore);
  };
  useEffect(() => {
    setMovingEgg(leftValue[sliderValue]);
  }, [sliderValue]);
  useEffect(() => {
    handleEggPosition(movingEgg);
  }, [movingEgg]);
  /*     onClick = {() => {
    clbk("t_good");
    clicked("t_good");
}} */
  return (
    <>
      <div className="container flex">
        <div className="filterMood">
          <input
            type="checkbox"
            id="filterbymood"
            onChange={() => {
              clbkCheck();
              toggleFilter();
            }}
            checked={isChecked && isChecked}
          />{" "}
          <label htmlFor="filterbymood">Filter by mood </label>
        </div>
        <div
          className={`chartsbymood ${isChecked ? "slideRight" : "is-hidden"}`}
        >
          <img
            className="emoji"
            src={moodScale[sliderValue].moodState}
            alt="mood"
            style={{ marginLeft: eggPosition }}
          />
          <div className="slidecontainer">
            <input
              type="range"
              min={0}
              max={10}
              value={sliderValue}
              onChange={e => {
                clbk(e.target.value);
                sliderChange(e.target.value);
              }}
              className="slider"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChartsByMood;
