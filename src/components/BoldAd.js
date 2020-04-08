import React from 'react';
import css from './BoldAd.module.css';
import { OutboundLink } from "gatsby-plugin-google-analytics"
import { sample } from "lodash";

const CTAs = [
  "codePost is awarding CS students a $500 scholarship. Click to apply!",
  "Are you a CS student? codePost is awarding a $500 scholarship to the best essay.",
  "If you are a CS student looking for a scholarship, click to apply! It's easy an free.",
];

const BoldAd = () => {
  const selectedCTA = sample(CTAs);  
  return (
    <OutboundLink 
      href="https://bold.org/scholarships/codepost-computer-science-education-scholarship/"
      target="_blank"      
      className={css['container']}
      eventCategory="Bold"
      eventAction="codePost Click"
      eventLabel={selectedCTA}>
      {selectedCTA}
    </OutboundLink>
  )
}

export default BoldAd;