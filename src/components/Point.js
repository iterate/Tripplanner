import React from "react";
import styled from "styled-components";

const PointDiv = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  align-items: center;
  height: 20px;
`;
const MarkerImg = styled.img`
  height: 20px;
`;
const MarkerTitle = styled.h3`
  margin-left: 10px;
  font-size: 16px;
`;

const Point = props => (
  <PointDiv>
    <MarkerImg src={props.markerImg} />
    <MarkerTitle>MarkerName</MarkerTitle>
  </PointDiv>
);

export default Point;
