import React from "react";
import styled from "styled-components";
import Createmap from "./Createmap";

const HeaderDiv = styled.div`
  background-image: url("./images/headerPhoto.png");
  height: 450px;
  display: flex;
  flex-direction: column;
`;

const headingStyle = `
margin-left: 160px;
font-weight: 300;
text-align: initial;
background: rgba(255, 255, 255, 0.75);
margin: 5px 20px;
align-self: flex-start;
`;

const HeadingTitle = styled.h1`
  ${headingStyle};
  margin-top: 100px;
`;

const HeadingSubtitle = styled.h3`
  ${headingStyle};
`;

const Header = props => (
  <HeaderDiv>
    <HeadingTitle>Save all your trips TODOs in one map!</HeadingTitle>
    <HeadingSubtitle>
      Don´t let your trips itinerary get lost in translation!
    </HeadingSubtitle>
    <Createmap
      onTextChange={props.onTextChange}
      onTextKeyDown={props.onTextKeyDown}
      onCreateRoomClick={props.onCreateRoomClick}
    />
  </HeaderDiv>
);

export default Header;
