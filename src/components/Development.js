import React from "react";
import styled from "styled-components";
import Button from "./ButtonComponent";
import Form from "./Form";

const DevelopmentDiv = styled.div`
  background: #ffffffd4;
  position: absolute;
  top: 10px;
  left: 10px;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const StyledBtn = styled(Button)`
  margin: auto;
`;

const Createmap = props => (
  <DevelopmentDiv>
    <h3>This map is a pilot project</h3>
    <span>We are testing a new concept,</span>
    <span>and would love to hear your feedback! </span>
    <Form />
  </DevelopmentDiv>
);

export default Createmap;
