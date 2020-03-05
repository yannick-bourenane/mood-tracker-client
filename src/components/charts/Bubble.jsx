import React, { useState, useEffect } from "react";
import APIHandler from "../../api/APIHandler";
import BubbleChart from "@weknow/react-bubble-chart-d3";
let moodData;

const Bubble = ({ dateRange, filterByType, filterByMood, allMood }) => {
  let m;
  let moodScore = filterByMood;

  const [moodKeywords, setMoodKeywords] = useState([]);

  const [mood, setMood] = useState(0);
  useEffect(() => {
    allMood ? (m = "all") : (m = moodScore);
    APIHandler.get(`/daymood/keywords/${m}/${dateRange}?`)
      .then(moods => {
        setMood(moods.data);
      })
      .catch(err => console.log(err));
  }, [dateRange, moodScore, allMood]);

  useEffect(() => {
    moodData = [];
    if (filterByType === "t_both" || filterByType === "t_good") {
      for (let key in mood.k_good) {
        moodData.push({
          value: Number(mood.k_good[key]),
          label: key,
          color: "#FF9AA1"
        });
      }
    }
    if (filterByType === "t_both" || filterByType === "t_bad") {
      for (let key in mood.k_bad) {
        moodData.push({
          value: Number(mood.k_bad[key]),
          label: key,
          color: "#C7CEEA"
        });
      }
    }
    setMoodKeywords(moodData);
  }, [mood, filterByType]);
  /*   bubbleClick = label => {
    console.log("Custom bubble click func");
  };
  legendClick = label => {
    console.log("Customer legend click func");
  }; */
  return (
    <>
      {moodKeywords.length > 0 ? (
        <>
          <BubbleChart
            graph={{
              zoom: 1,
              offsetX: 0,
              offsetY: 0
            }}
            width={300}
            height={300}
            padding={0} // optional value, number that set the padding between bubbles
            showLegend={false} // optional value, pass false to disable the legend.
            legendPercentage={20} // number that represent the % of with that legend going to use.
            legendFont={{
              family: "Arial",
              size: 12,
              color: "#000",
              weight: "bold"
            }}
            valueFont={{
              family: "Arial",
              size: 10,
              color: "#fff",
              weight: "bold"
            }}
            labelFont={{
              family: "Arial",
              size: 12,
              color: "#fff",
              weight: "bold"
            }}
            //Custom bubble/legend click functions such as searching using the label, redirecting to other page
            // bubbleClickFunc={this.bubbleClick}
            // legendClickFun={this.legendClick}
            data={moodKeywords}
          />
        </>
      ) : (
        <div className="notification">
          <h3>No data !</h3>
          <img src="/images/emotions/00.png" alt="Sad egg" />
        </div>
      )}
    </>
  );
};

export default Bubble;
