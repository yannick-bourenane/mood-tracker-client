import React, { useState, useEffect } from "react";
import Keywords from "./Keywords";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";

// Demo styles, see 'Styles' section below for some notes on use.
// import 'react-accessible-accordion/dist/fancy-example.css';

export default function Collapse({ clbk, tagsData, dataSaved }) {
  const [positiveTags, setPositiveTags] = useState([]);
  const [negativeTags, setNegativeTags] = useState([]);

  const updatePositiveTags = val => {
    setPositiveTags(val);
  };

  const updateNegativeTags = val => {
    setNegativeTags(val);
  };

  useEffect(() => {
    clbk({ positive: positiveTags, negative: negativeTags });
  }, [positiveTags, negativeTags]);

  return (
    <div className="keywords">
      <Accordion allowZeroExpanded="true">
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton className="accordion-btn">
              What made you feel positive today?
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <Keywords
                title="positive"
                clbk={updatePositiveTags}
                defaultTags={tagsData.positive}
                dataSaved={dataSaved}
            />
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton className="accordion-btn">
              What made you feel negative today?
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <Keywords
                title="negative"
                clbk={updateNegativeTags}
                defaultTags={tagsData.negative}
                dataSaved={dataSaved}
            />
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
