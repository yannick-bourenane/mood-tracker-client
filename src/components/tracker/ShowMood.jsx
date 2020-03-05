import React from 'react'

const ShowMood = () => {

    //fetch data and show

    return (
    <div className="moodpage" style={{backgroundColor:"#fff"}}>
      <p className="date">{format(new Date(), "'Today is' PPPP")}</p>
      <h1>How are you feeling?</h1>
      <form className="form" onSubmit={handleSubmit}>
        <img className="emoji" src={moodScale[sliderValue].moodState} alt="mood"/>
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
        <Collapse 
          clbk={updateTags}
        />
        <button
          style={btnClicked ? {backgroundColor: "#fff", borderColor:colorValue} : {backgroundColor:colorValue}}
          className= "btn-ok"
          disabled={btnClicked}
        >
          {btnClicked ? "Saved !" : <FontAwesomeIcon icon={faCheck} />}
        </button>
      </form>
      
    </div>
    )
}

export default ShowMood
