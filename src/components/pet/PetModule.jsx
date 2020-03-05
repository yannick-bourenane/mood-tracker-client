import React, { useState, useEffect, useRef, useContext } from "react";
import APIHandler from "../../api/APIHandler";
import UserContext from "../../auth/UserContext";

import petMessages from "../../data/pet_messages"
import templateString from "../../helpers/templateString"
import '../../styles/pet.css'

const PetModule = () => {
  const userContext = useContext(UserContext);
  const { currentUser } = userContext;

  const [petData, setPetData] = useState({});
  const [previousMsg, setPreviousMsg] = useState("");
  const [currentMsg, setCurrentMsg] = useState("");
  const [requestingMsg, setRequestingMsg] = useState("Fetching pet...");
  const [isRequesting, setIsRequesting] = useState(true);
  const [isStoreOpen, setIsStoreOpen] = useState(false);
  const [notEnoughCredits, setNotEnoughCredits] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [petStage, setPetStage] = useState(0);
  const [petStageName, setPetStageName] = useState("");
  const [petState, setPetState] = useState("idle");

  // First time, do an ajax request
  useEffect(() => {
    APIHandler.get("/pet").then((apiRes) => {
      console.log("Pet data : ", apiRes.data);

      setPetData(apiRes.data);
      setStageBasedOnExp(apiRes.data.exp)
      interactWithUser(apiRes.data.exp, apiRes.data.hp, apiRes.data.name);

      setIsRequesting(false);


    }).catch(err => {
      setRequestingMsg("Unable to fetch pet!")
      console.log("Error : ", err)
    });

  }, []);

  // AJAX Request for PATCH of the pet with new Values
  const updatePet = (updatedValues, onPetUpdated) => {
    const newObject = {...petData}
    Object.assign(newObject, updatedValues)

    const apiCall = async () => {
      const apiRes = await APIHandler.patch("/pet", newObject)

      // On AJAX return, set new values locally
      // So that the view gets updated
      setPetData(apiRes.data, onPetUpdated);
      setStageBasedOnExp(apiRes.data.exp)

      closeStore();

      // Dont show appreciation if HP still 0
      if (apiRes.data.hp === 0) { return; }

      petJump(2);
      displayRandomMsg('thanks');

      // If we upgraded his HP
      if ('hp' in updatedValues) {
        setPetState('eating');
      }

    }

    apiCall();
  }

  // STAGES of evolution based on exp
  const setStageBasedOnExp = (exp) => {

    // from 0 to 100 exp ( egg stage evolution every 20 exp )
    let stage = Math.floor(exp/20);

    // Maximum stage for now (Baby T-rex)
    if ( stage > 6 ) { stage = 6; }

    setPetStage(stage);
    setPetStageName(stage <= 5 ? 'egg' : 'dino');
  }

  const interactWithUser = (exp, hp, petName) => {

    if (hp === 0) {
      setPetState("sleeping");
      setCurrentMsg("Your pet is hibernating. Track your mood or give him food to wake him up !")
      return;
    }

    petJump(4);

    if (exp === 0) {
      displayRandomMsg('first_time', petName);
    } else {
      displayRandomMsg('greeting', petName);
    }
  }

  // ON PET CLICK
  const onPetClick = () => {

    // No interactions if sleeping
    if(petState === 'sleeping') { return; }

    petJump(1);
    displayRandomMsg('cheer_up')
  }

  // PET STORE

  const onStoreClick = () => {
    setIsStoreOpen(!isStoreOpen);
  }

  const closeStore = () => {
    setIsStoreOpen(false);
  }

  // Add or remove HP staying in the right range
  const getUpdatedHP = (hpAdded, min = 0, max = 100) => {
    let newHp = petData.hp + hpAdded;
    if(newHp < min ) newHp = min;
    if(newHp > max ) newHp = max;
    return newHp;
  }

  const getUpdatedCredits = (creditCost, min = 0 ) => {
    let newCredits = petData.ownerCredits + creditCost;
    if (newCredits < min) newCredits = min;
    return newCredits;
  }

  const onItemClick = (e, itemCost) => {
    if ( itemCost > petData.ownerCredits ) {
      setNotEnoughCredits(true);
      return;
    } else { setNotEnoughCredits(false) }

    let itemName = e.target.id.split("-")[1];

    // RED POT -> +5 HP (COST 20 credits)
    if (itemName === 'hpot') {
      updatePet({ hp : getUpdatedHP(+5), ownerCredits : getUpdatedCredits(-20) })
    }

    // BOOK -> +10XP (COST 50 credits)
    if (itemName === 'book') {
      updatePet({ exp : petData.exp + 10, ownerCredits : getUpdatedCredits(-50) })
    }

    // BUNNY -> +50HP - +50XP (COST 200 credits)
    if (itemName === 'bunny') {
      updatePet({
        hp : getUpdatedHP(+50),
        exp : petData.exp + 50,
        ownerCredits : getUpdatedCredits(-200)
      })
    }

  }

  // PET JUMPING
  // Jump x nb of times, or infinite if no nb
  const petJump = (nb) => {
    if ( isJumping || isTalking ) return;

    let jumpCount = 1;
    setIsJumping(true);

    let intID = setInterval(function() {
      if ( !!nb && jumpCount >= nb ) {
        clearInterval(intID);
        setIsJumping(false);
        return;
      }
      jumpCount++;
    }, 1000)
  }

  // PET MESSAGE
  const getRandomMsg = (msgType, templateValues) => {
    let msgArr = petMessages[msgType];
    let randomMsg = templateString(msgArr[Math.floor(Math.random()*msgArr.length)], templateValues)
    if ( randomMsg === previousMsg && msgArr.length > 1 ) { return getRandomMsg(msgType, templateValues) }
    setPreviousMsg(randomMsg)
    return randomMsg;
  }

  const displayRandomMsg = (msgType, petName = 'Dino') => {
    if (isTalking) return;
    setPetState("talking")
    setIsTalking(true);

    let user = (currentUser && currentUser.firstname) ? currentUser.firstname : 'NONAME';
    let pName = petData.name ? petData.name : petName;

    let msgToDisplay = `${pName} : `.concat(getRandomMsg(msgType, {user : user, name : pName}))

    let msgIndex = 0;
    let newStr = '';
    let intID = setInterval(function(){

      newStr += msgToDisplay.charAt(msgIndex);
      setCurrentMsg(newStr)

      msgIndex++;

      if (msgIndex > msgToDisplay.length){
         clearInterval(intID);
         setPetState("idle")
         setIsTalking(false);
      }

    }, 50)

  }

  return (
    <div className="petContainer shadow">

      { isRequesting ? (
        <div className="pet-loader flex-center-column">{requestingMsg}</div>
      ) : (
        isStoreOpen ?

          <div className="pet-store">
            <div className="store-header">
              <span className="store-back" onClick={closeStore}>&lt; BACK</span>

              <div className="flex-center-row">{notEnoughCredits && "NOT Enough " }Credits <span className="smallCoin"></span> x {petData.ownerCredits}</div>
            </div>
            <div className="items">

              <div className="line-w">
                <div className="item-w">
                  <div id="item-hpot" className="item hpot" onClick={(e) => onItemClick(e, 20)}></div>
                </div>

                <div className="itemStats">
                  <span className="itemEffect">+5HP</span>
                  <span className="itemCost"><span className="smallCoin"></span> x 20</span>
                </div>
              </div>

              <div className="line-w">
                <div className="item-w">
                  <div id="item-book" className="item book" onClick={(e) => onItemClick(e, 50)}></div>
                </div>

                <div className="itemStats">
                  <span className="itemEffect">+10XP</span>
                  <span className="itemCost"><div className="smallCoin"></div> x 50</span>
                </div>
              </div>

              { petStageName === 'dino' && (
              <div className="line-w">
                <div className="item-w">
                  <div id="item-bunny" className="item bunny" onClick={(e) => onItemClick(e, 200)}></div>
                </div>

                <div className="itemStats">
                  <span className="itemEffect">+50HP +50XP</span>
                  <span className="itemCost"><div className="smallCoin"></div> x 200</span>
                </div>
              </div>
              )}

            </div>
          </div>

        :
          <>
          <div className="pet-infos">
            <div className="health flex-center-column">
              <div className="health-icon"></div>
              {petData.hp}/100
            </div>
            <div className="store-w flex-center-column" onClick={onStoreClick}>
              <div className="storeIcon"></div>
            </div>
            <div className="exp flex-center-column">
              <div className="exp-icon">XP</div>
              {petData.exp}
            </div>
          </div>

          <div className={`pet-playground ${petStageName}`}>
            <div className="pet-w">
            <div className={`pet-sleeping ${petState === 'sleeping' ? '' : 'is-hidden'}`}></div>
            { petStageName === 'egg' ? (
              <div className={`pet ${petStageName} ${isJumping ? 'jumping' : ''} ${petState} es${petStage}`}
                   onClick={onPetClick}>
              </div>
            ) : (
              <div className={`pet ${petStageName} ${isJumping ? 'jumping' : ''} ${petState}`}
                   onClick={onPetClick}>
              </div>
            )}
            <div className={`pet-shadow ${isJumping ? 'jumping' : '' }`}></div>
            </div>
          </div>

          <div className="pet-message">
            <span>{currentMsg}</span>
          </div>
          </>

      )}

    </div>
  )
};

export default PetModule;
