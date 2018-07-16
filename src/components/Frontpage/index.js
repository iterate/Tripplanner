import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Createmap from "./Createmap";
import Steps from "./Steps";
import "./Frontpage.css";

const ContainerDiv = styled.div`
  max-width: 1400px;
  margin: auto;
  background: rgb(249, 247, 247);
`;
const Content = styled.div`
  max-width: 1400px;
  margin: auto;
  background: rgb(249, 247, 247);
  margin-top: 100px;
`;

const Heading = styled.h1`
  text-align: center;
`;

const Frontpage = props => (
  <ContainerDiv>
    <Header />
    <Createmap
      onTextChange={props.onTextChange}
      onTextKeyDown={props.onTextKeyDown}
      onCreateRoomClick={props.onCreateRoomClick}
    />
    <Content>
      <Heading>How it works</Heading>
      <Steps />
    </Content>
  </ContainerDiv>
);

export default Frontpage;
