import React, { useEffect, useState } from "react";
import Bubble from "../components/charts/Bubble";
import { format, subDays } from "date-fns";
import Calendar from "../components/charts/Calendar";
import ChartsNav from "../components/charts/filters/ChartsNav";
import ChartsByDate from "../components/charts/filters/ChartsByDate";
import ChartsByType from "../components/charts/filters/ChartsByType";
import ChartsByMood from "../components/charts/filters/ChartsByMood";

const Stats = () => {
  //default date (lastweek => today)
  let endDate = format(new Date(), "yyyyMMdd");
  let startDate = format(subDays(new Date(), 7), "yyyyMMdd");
  // setting up what to show (default : calendar)
  const [statType, setStatType] = useState("moodscore");

  // filter by date (default : this week)
  const [filterByDate, setFilterByDate] = useState("last7");

  const [filterByType, setFilterByType] = useState("t_both");

  const [filterByMood, setFilterByMood] = useState(5);

  const [eggPosition, setEggPosition] = useState("46%");

  const [allMood, setAllmood] = useState(true);

  const [isChecked, setIsChecked] = useState(false);

  // date range to send to the components as props (default : from last week to today)
  const [dateRange, setDateRange] = useState(`${startDate}/${endDate}`);

  const handleClick = value => {
    setStatType(value);
  };
  const handleFilterByDate = date => {
    setFilterByDate(date);
  };
  const handleFilterByType = type => {
    setFilterByType(type);
  };
  const handleFilterByMood = mood => {
    setFilterByMood(Number(mood));
  };
  const handleCheck = () => {
    setAllmood(!allMood);
  };
  const toggleFilter = () => {
    setIsChecked(!isChecked);
  };
  const handleEggPosition = position => {
    console.log(position);
    setEggPosition(position);
  };
  useEffect(() => {
    /* if (filterByDate === "alldate") {
      startDate = format(subDays(new Date(), 20000), "yyyyMMdd");
    } else  */
    if (filterByDate === "last365") {
      startDate = format(subDays(new Date(), 365), "yyyyMMdd");
    } else if (filterByDate === "last30") {
      startDate = format(subDays(new Date(), 30), "yyyyMMdd");
    } else {
      startDate = format(subDays(new Date(), 7), "yyyyMMdd");
    }
    setDateRange(`${startDate}/${endDate}`);
  }, [filterByDate]);

  return (
    <section className="section">
      {console.log(eggPosition)}
      {/*       <h1 className="title has-text-centered">
        <img
          className="gif-egg"
          src="/images/emotions/emoticon.gif"
          alt="Your moods"
        />
      </h1> */}
      <div className="container">
        <ChartsNav clbk={handleClick} />
        {statType !== "moodscore" && (
          <>
            <ChartsByType
              clbk={handleFilterByType}
              filterByType={filterByType}
            />
          </>
        )}
        {statType === "moodscore" && <Calendar />}
        {statType === "keyword" && (
          <div className="bubble-chart">
            <Bubble
              dateRange={dateRange}
              filterByType={filterByType}
              filterByMood={filterByMood}
              allMood={allMood}
            />
          </div>
        )}
        {statType !== "moodscore" && (
          <>
            <ChartsByMood
              clbk={handleFilterByMood}
              filterByMood={filterByMood}
              handleEggPosition={handleEggPosition}
              eggPosition={eggPosition}
              clbkCheck={handleCheck}
              allMood={allMood}
              toggleFilter={toggleFilter}
              isChecked={isChecked}
            />
            <ChartsByDate
              clbk={handleFilterByDate}
              filterByDate={filterByDate}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default Stats;
