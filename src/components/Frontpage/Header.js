import React from "react";
import styled from "styled-components";

const HeaderDiv = styled.div`
  background-image: url("./images/headerPhoto.png");
  height: 450px;
`;

const headingStyle = `
position: absolute;
margin-left: 160px;
font-weight: 300;
text-align: initial;
background: rgba(255, 255, 255, 0.75);
margin: 5px 10px;
margin-top: 140px;
`;

const HeadingTitle = styled.h1`
  ${headingStyle};
`;

const HeadingSubtitle = styled.h3`
  ${headingStyle};
  margin-top: 190px;
`;

const Header = () => (
  <HeaderDiv>
    <HeadingTitle>Save all your trips TODOs in one map!</HeadingTitle>
    <HeadingSubtitle>
      Don´t let your trips itinerary get lost in translation!
    </HeadingSubtitle>
  </HeaderDiv>
);

export default Header;
