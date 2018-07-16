import React from "react";
import styled from "styled-components";
import Createmap from "./Createmap";

const HeaderDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 768px) {
    align-items: center;
    align-self: flex-end;
    background-image: url("./images/headerPhoto.png");
  }
  @media (min-width: 1024px) {
    height: 450px;
  }
`;

const headingStyle = `
  font-weight: 300;
  color: white;
  // 
  @media (min-width: 768px) {
    color: black;
    background: rgba(255, 255, 255, 0.75);
    align-self: flex-start;
    text-align: initial;
    margin: 5px 20px;
  }
`;

const HeadingTitle = styled.h1`
  ${headingStyle};
  font-size: 18px;
  @media (min-width: 768px) {
    display: block;
    font-size: 30px;
    margin-top: 100px;
    font-size: 40px;
  }
`;

const HeadingSubtitle = styled.h3`
  ${headingStyle};
  display: none;
  @media (min-width: 768px) {
    display: inline;
    font-size: 22px;
  }
`;

const Header = props => (
  <HeaderDiv>
    <HeadingTitle>Save all your trips TODOs in one map!</HeadingTitle>
    <HeadingSubtitle>
      Don´t let your trips itinerary get lost in translation!
    </HeadingSubtitle>
    <Createmap
      warning={true}
      onTextChange={props.onTextChange}
      onTextKeyDown={props.onTextKeyDown}
      onCreateRoomClick={props.onCreateRoomClick}
    />
  </HeaderDiv>
);

export default Header;
