import React from "react";
import "../styles/css library/wickedcss.min.css";
import "../styles/splash.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from "react-accessible-accordion";

const KeyFeatures = () => {
  return (
    <Accordion allowZeroExpanded="true">
      <AccordionItem>
        <AccordionItemHeading>
            <AccordionItemButton className="shadow-btns btn-splash btn-key">Key Features </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <div className="features-wrapper">
            {/* <h2>Features:</h2> */}
            <div id="features" className="flex-center-row features-box">
              <img className="splash-img" src="/images/emotions/01.png" />
              <p className="splash-text">
                Track your mood daily and gain points for your virtual pet
              </p>
            </div>
            <div className="flex-center-row features-box">
              <p className="splash-text">
                Nourish your pet and watch it evolve over time
              </p>
              <img
                className="splash-egg wiggle"
                src="/images/splash_page/egg.gif"
              />
            </div>
            <div className="flex-center-row features-box">
              <img className="splash-img" src="/images/emotions/04.png" />
              <p className="splash-text">
                Add friends who can be notified when you have been feeling down
              </p>
            </div>
            <div className="flex-center-row features-box">
              <p className="splash-text">
                Understand your mood triggers with bubble charts
              </p>
              <img className="splash-img" src="/images/emotions/08.png" />
            </div>
          </div>
        </AccordionItemPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default KeyFeatures;
