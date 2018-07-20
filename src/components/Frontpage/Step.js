import React, { Component } from "react";
import styled from "styled-components";
import { H3Heading } from "../HeadingStyles";

const StepDiv = styled.div`
  order: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  max-width: 400px;
  @media (min-width: 768px) {
    width: 30%;
  }
`;

const SpanTxt = styled.span`
  font-weight: 300;
  width: 80%;
  font-size: 18px;
`;
const Img = styled.img`
  height: 37px;
  margin: auto;
`;
const ImgDiv = styled.div`
  display: flex;
`;
const DescriptionDiv = styled.div`
  margin: auto;
  @media (min-width: 768px) {
    width: 80%;
  }
`;

class Step extends Component {
  render() {
    return (
      <StepDiv className={this.props.className}>
        <ImgDiv>
          <Img src={this.props.img} />
        </ImgDiv>
        <DescriptionDiv>
          <H3Heading>{this.props.stepHeading}</H3Heading>
          <SpanTxt>{this.props.spanTxt}</SpanTxt>
        </DescriptionDiv>
      </StepDiv>
    );
  }
}

export default Step;
