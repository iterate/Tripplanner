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
    background-image: url("./images/map_pins.jpg");
    background-size: cover;
    background-position: center;
    width: 100vw;
  }
  @media (min-width: 1024px) {
    height: 100vh;
  }
`;

const headingStyle = `
  font-weight: 400;
  color: white;
  // 
  @media (min-width: 768px) {
    color: #49828e;
    background: rgba(255, 255, 255, 0.75);
    align-self: flex-start;
    text-align: initial;
    margin: 5px 100px;
    // margin-left: 100px;
  }
`;

const HeadingTitle = styled.h1`
  ${headingStyle};
  font-size: 18px;
  font-weight: 400;
  @media (min-width: 768px) {
    display: block;
    font-size: 30px;
    margin-top: 100px;
    font-size: 40px;
  }
  // color: #49828e !important;
`;

const Header = props => (
  <HeaderDiv>
    <HeadingTitle>
      Collect all your trip planning resources<br />in one map
    </HeadingTitle>
    <Createmap {...props} />
  </HeaderDiv>
);

export default Header;
