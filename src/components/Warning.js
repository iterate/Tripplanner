import React from "react";
import styled from "styled-components";

const WarningDiv = styled.div`
  color: #963e64;
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`;
const WarningTxt = styled.div`
  color: #963e64;
  align-self: flex-end;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
`;
const WarningSpan = styled.span`
  color: #963e64;
  align-self: flex-start;
  margin-left: 10px;
  font-weight: 400;
`;
const WarningImg = styled.img`
  height: 20px;
  align-self: flex-start;
`;

const Warning = props => (
  <WarningDiv>
    <WarningImg src="/images/warning.png" />
    <WarningTxt>
      <WarningSpan>{props.warningl1} </WarningSpan>
      <WarningSpan>{props.warningl2}</WarningSpan>
    </WarningTxt>
  </WarningDiv>
);

export default Warning;
