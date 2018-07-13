import React from "react";
import styled from "styled-components";
import Step from "./Step";

const FeedbackDiv = styled.div`
  display: flex;
  margin: auto;
  color: white;
`;

var centered = {
  margin: "auto"
};
const Feedback = () => (
  <FeedbackDiv>
    <Step
      style={centered}
      img={"/images/contact.png"}
      stepHeading={"Contact us"}
      spanTxt={
        "If you need to get in contact with us, just hit us up on post@mappoint.com"
      }
    />
  </FeedbackDiv>
);

export default Feedback;
