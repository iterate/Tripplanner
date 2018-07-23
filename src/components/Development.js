import React from "react";
import styled from "styled-components";
import Button from "./ButtonComponent";
import Form from "./Form";

const DevelopmentDiv = styled.div`
  background: #fff;
  position: absolute;
  bottom: 20px;
  right: 10px;
  max-width: 818px;
  width: 500px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-align-content: center;
  -ms-flex-line-pack: center;
  align-content: center;
  text-align: center;
  padding: 10px;
  border-radius: 5px;
  -webkit-box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h3`
  font-weight: bold;
  margin: 10px;
`;

const Createmap = props => (
  <DevelopmentDiv>
    <Heading>Thank you for visiting!</Heading>
    <span>
      This map is currently under development, and your feedback is very
      valuable to us 🙏
    </span>
    <Form roomId={props.roomId} />
  </DevelopmentDiv>
);

export default Createmap;
