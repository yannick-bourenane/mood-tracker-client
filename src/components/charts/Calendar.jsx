import React, { useState, useEffect } from "react";
import moodScale from "../../data/mood_scale";
import APIHandler from "../../api/APIHandler";

import {
  startOfWeek,
  addDays,
  subMonths,
  addMonths,
  format,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  isSameDay,
  differenceInDays,
  toDate,
  parse
} from "date-fns";
import "../../styles/calendar.css";

const Calendar = ({ data }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [fetchStartDate, setFetchStartDate] = useState(0);
  const [fetchEndDate, setFetchEndDate] = useState(0);

  const [mood, setMood] = useState(0);

  useEffect(() => {
    updateFetch();
  }, [currentDate]);

  useEffect(() => {
    APIHandler.get(`/daymood/mood/${fetchStartDate}/${fetchEndDate}?`)
      .then(moods => {
        setMood(moods.data);
      })
      .catch(err => console.log(err));
  }, [fetchStartDate, fetchEndDate]);

  const header = () => {
    const dateFormat = "MMMM yyyy";
    return (
      <div className="header row flex-middle">
        <div className="column col-start">
          <div className="icon" onClick={prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="column col-center">
          <span>{format(currentDate, dateFormat)}</span>
        </div>
        <div className="column col-end">
          <div className="icon" onClick={nextMonth}>
            chevron_right
          </div>
        </div>
      </div>
    );
  };
  const days = () => {
    const dateFormat = "E";
    const days = [];
    let startDate = startOfWeek(currentDate);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="column col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="days row">{days}</div>;
  };
  const cells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        let found = false;
        let moodScore;
        if (mood.payload) {
          for (var j = 0; j < mood.payload.length; j++) {
            if (mood.payload[j].day == format(day, "yyyyMMdd")) {
              found = true;
              if (mood.payload[j].mood >= 0) moodScore = mood.payload[j].mood;
              break;
            }
          }
        }
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            // style={
            //   moodScore
            //     ? { backgroundColor: /*moodScale[moodScore].bgColor*/ "white" }
            //     : { backgroundColor: "white" }
            // }
            className={`column cell ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSameDay(day, selectedDate)
                ? "selected"
                : ""
            }`}
            key={day}
            // onClick={() => onDateClick(parse(cloneDay))}
          >
            {moodScore ? (
              <span className="moodCell">
                <img src={moodScale[moodScore].moodState} />
              </span>
            ) : (
              <span className="moodCell"></span>
            )}
            <span className="date-number">{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {" "}
          {days}{" "}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };

  function updateFetch() {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    setFetchStartDate(format(startDate, "yyyyMMdd"));
    setFetchEndDate(format(endDate, "yyyyMMdd"));
  }

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const onDateClick = day => {
    setSelectedDate(day);
  };

  return (
    <div className="calendar">
      <div>{header()}</div>
      <div>{days()}</div>
      <div>{cells()}</div>
    </div>
  );
};
export default Calendar;
