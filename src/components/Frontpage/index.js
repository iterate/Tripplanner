import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Steps from "./Steps";
import "./Frontpage.css";
import Feedback from "./Feedback";

const ContainerDiv = styled.div`
  max-width: 1400px;
  margin: auto;
`;
const Content = styled.div`
  max-width: 1400px;
  margin: auto;
  background: rgb(249, 247, 247);
  padding-top: 100px;
  padding-bottom: 200px;
`;

const Heading = styled.h1`
  text-align: center;
`;

const Frontpage = props => (
  <ContainerDiv>
    <Header
      mapInUseWarning={props.mapInUseWarning}
      notExistsWarning={props.notExistsWarning}
      onTextChange={props.onTextChange}
      onTextKeyDown={props.onTextKeyDown}
      onCreateRoomClick={props.onCreateRoomClick}
      onVisitMapClick={props.onVisitMapClick}
    />
    <Content>
      <Heading>How it works</Heading>
      <Steps />
    </Content>
    <Feedback />
  </ContainerDiv>
);

export default Frontpage;
