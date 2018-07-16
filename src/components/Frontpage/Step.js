import React, { Component } from "react";
import styled from "styled-components";

const StepDiv = styled.div`
  width: 30%;
  order: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  // @media (min-width: 768px) {
  //   width: 100%;
  // }
`;

const SpanTxt = styled.span`
  font-weight: 300;
  width: 80%;
`;
const Img = styled.img`
  height: 37px;
  margin: auto;
`;
const ImgDiv = styled.div`
  display: flex;
`;
const StepHeading = styled.h3`
  text-align: inherit;
`;
const DescriptionDiv = styled.div`
  width: 80%;
  margin: auto;
`;

class Step extends Component {
  render() {
    return (
      <StepDiv className={this.props.className}>
        <ImgDiv>
          <Img src={this.props.img} />
        </ImgDiv>
        <DescriptionDiv>
          <StepHeading>{this.props.stepHeading}</StepHeading>
          <SpanTxt>{this.props.spanTxt}</SpanTxt>
        </DescriptionDiv>
      </StepDiv>
    );
  }
}

export default Step;
