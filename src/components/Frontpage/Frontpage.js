import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Createmap from "./Createmap";
import Steps from "./Steps";
import Feedback from "./Feedback";
import "./Frontpage.css";

const ContainerDiv = styled.div`
  max-width: 1400px;
  margin: auto;
`;
const Content = styled.div`
  max-width: 1400px;
  margin: auto;
  padding-top: 100px;
  background: rgb(249, 247, 247);
`;

const Heading = styled.h1`
  text-align: center;
`;

const Space = styled.div`
  height: 200px;
`;

const Frontpage = () => (
  <ContainerDiv>
    <Header />
    <Createmap />
    <Content>
      <Heading>How it works</Heading>
      <Steps />
      <Space />
    </Content>
    <Feedback />
  </ContainerDiv>
);

export default Frontpage;
