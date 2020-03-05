import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import Collapse from "../components/tracker/Collapse";
import "../styles/tracker.css";

import moodScale from "../data/mood_scale";
import APIHandler from "../api/APIHandler";

const TrackMood = ({ history }) => {

  const [sliderValue, setSliderValue] = useState(5);
  const [colorValue, setColorValue] = useState("");
  const [tags, setTags] = useState({
    positive : [],
    negative : []
  });
  const [btnClicked, setClicked] = useState(false);
  const [dataSaved, setDataSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  const updateTags = (val) => {
    setTags(val)
  }

  useEffect(() => {
    APIHandler.get("/daymood")
    .then(res => {
      let existingMood = res.data[0];

      // If no previous data, do nothing
      if (!existingMood) return;

      // Otherwise, set current day mood
      setSliderValue(Number(existingMood.mood))
      setTags({ positive : existingMood.k_good, negative: existingMood.k_bad })
      setDataSaved(true)
      setIsLoading(false)
    })
    .catch(err => console.error(err))

    return () => {}
  }, [])

  useEffect(() => {
    setColorValue(changeBackground(sliderValue))
  })

  const sliderChange = e => {
    setSliderValue(+e.target.value)
  }

  const changeBackground = (range) => {
     return moodScale[range].bgColor
  }

  const handleSubmit = e => {
    setClicked(true); // disables button once clicked
    e.preventDefault();
    const newMood = {tags: tags, intensity: sliderValue}
    APIHandler.post("/daymood/new", newMood)
    .then(res => {
      history.push("/dashboard"); // redirects to dashboard
    })
    .catch(err => console.error(err))
  }


  return (
    <>
    {isLoading && <div className="flex-center-column loading"><img className="spinner loading-img" src="/images/loading.gif" /></div>}
    <div className={isLoading ? "is-hidden" : "moodpage"} style={{backgroundColor:"#fff"}}>
      <p className="date">{format(new Date(), "'Today is' PPPP")}</p>
      { !!dataSaved ? (
        <h1>Today you are feeling...</h1>
      ) : (
        <h1>How are you feeling?</h1>
      )}
        <form className="form" onSubmit={handleSubmit}>
          <img className="emoji" src={moodScale[sliderValue].moodState} alt="mood"/>
          {!dataSaved && (
          <div className="slidecontainer">
            <input
              type="range"
              min={0}
              max={10}
              value={sliderValue}
              onChange={sliderChange}
              className="slider"
            />
          </div>
          )}
          <Collapse
            clbk={updateTags}
            tagsData={tags}
            dataSaved={dataSaved}
          />

          { !dataSaved && (
          <button
            style={btnClicked ? {backgroundColor: "#fff", borderColor:colorValue} : {backgroundColor:colorValue}}
            className= "btn-ok"
            disabled={btnClicked}
          >
            {btnClicked ? "Saved !" : <FontAwesomeIcon icon={faCheck} />}
          </button>
          )}
        </form>
    </div>
    </>
  );
};

export default withRouter(TrackMood);
