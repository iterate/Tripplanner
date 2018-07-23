import React from "react";
import styled from "styled-components";
import Step from "./Step";

const StepDiv = styled.div`
  margin: auto;
  display: flex;
  font-size: 14px;
  flex-direction: column;
  align-items: center;
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
  @media (min-width: 1024px) {
    width: 80%;
  }
`;

const Steps = () => (
  <StepDiv>
    <Step
      img={"/images/map.png"}
      stepHeading={"Pin your inspiration"}
      spanTxt={
        "In the map you can add pins to the places you would like to visit on your next trip."
      }
    />
    <Step
      img={"/images/friends.png"}
      stepHeading={"Share with friends"}
      spanTxt={
        "Just share the magic link, and you can plan the perfect trip, together."
      }
    />
    <Step
      img={"/images/plan.png"}
      stepHeading={"Plan with ease"}
      spanTxt={
        "By linking to your regular travel inspiration-sites, blogs, or add tips from friends."
      }
    />
  </StepDiv>
);

export default Steps;
