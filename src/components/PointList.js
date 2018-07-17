import React, { Component } from "react";
import Point from "./Point";
import styled from "styled-components";

const PointListDiv = styled.div`
  background: #fffffffa;
  display: flex;
  flex-direction: column;
  padding: 10px;
  position: absolute;
  bottom: 20px;
  right: 10px;
  width: 225px;
  box-shadow: -2px 4px 4px 0 rgba(0, 0, 0, 0.25);
  height: 320px;
`;
const MarkerHeading = styled.h3`
  font-weight: bold;
`;

const PointList = props => (
  <PointListDiv>
    <MarkerHeading>Your pins</MarkerHeading>
    <Point markerImg={"/images/Pins/orange.png"} />
    <Point markerImg={"/images/Pins/red.png"} />
    <Point markerImg={"/images/Pins/orange.png"} />
    <Point markerImg={"/images/Pins/red.png"} />
    <Point markerImg={"/images/Pins/red.png"} />
    <Point markerImg={"/images/Pins/orange.png"} />
    <Point markerImg={"/images/Pins/orange.png"} />
    <Point markerImg={"/images/Pins/orange.png"} />
    <Point markerImg={"/images/Pins/orange.png"} />
    <Point markerImg={"/images/Pins/orange.png"} />
    <Point markerImg={"/images/Pins/orange.png"} />
    <Point markerImg={"/images/Pins/orange.png"} />
    <Point markerImg={"/images/Pins/orange.png"} />
  </PointListDiv>
);

export default PointList;
