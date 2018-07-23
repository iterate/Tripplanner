import React, { Component } from "react";
import styled from "styled-components";
import Steps from "./Frontpage/Steps";

const HowToDiv = styled.div`
  position: absolute;
  bottom: 0px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Show = styled.div`
  position: absolute;
  bottom: 40px;
  right:10px;
  height:46px;
  width:46px
  background: white;
  border: 1px solid black;
  border-radius: 100%;
  cursor: pointer;
  margin: auto;
  background-image: url("./images/info.png");
  background-repeat:no-repeat;
  background-size: 46px;
`;

export default class HowTo extends Component {
  state = { visible: false };

  toggleHowTo() {
    this.setState({
      visible: !this.state.visible
    });
  }
  render() {
    return (
      <React.Fragment>
        <Show onClick={this.toggleHowTo.bind(this)} />
        {this.state.visible ? (
          <HowToDiv>
            <h1>How it works</h1>
            <Steps />
          </HowToDiv>
        ) : null}
      </React.Fragment>
    );
  }
}
