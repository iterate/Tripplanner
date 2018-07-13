import React from "react";
import styled from "styled-components";
import Step from "./Step";

const StepDiv = styled.div`
  width: 80%;
  margin: auto;
  display: flex;
  font-size: 14px;
`;

const Steps = () => (
  <StepDiv>
    <Step
      img={"/images/map.png"}
      stepHeading={"Create a map.."}
      spanTxt={
        "that will work as a visual planner.In the map you can add pins to places you would like to wisit on your next trip."
      }
    />
    <Step
      img={"/images/friends.png"}
      stepHeading={"Add your friends.."}
      spanTxt={
        "to the map. Just share the magic link. Now you and your friends can plan the perfect group trip together."
      }
    />
    <Step
      img={"/images/plan.png"}
      stepHeading={"Start the planning.."}
      spanTxt={
        "by combining information from sites you prefer getting travel inspiration, including tips from friends. Just add links to prefered sites to the pins."
      }
    />
  </StepDiv>
);

export default Steps;
