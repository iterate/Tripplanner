import React from "react";
import ReactDOM from "react-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import styled from "styled-components";
import InputField from "./InputComponentStyle";
import ButtonStyle from "./ButtonComponent";

const InputDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: "roboto-light", sans-serif;
  margin-right: 10px;
`;
const CopyBtn = styled(ButtonStyle)`
  width: 150px;
  margin: 0px 5px;
`;
const InputFieldStyled = styled(InputField)`
  height: 36px;
  border-radius: 5px;
  background-color: #ffffffb3;
  border: none;
  margin-none;
  width: 200px;
`;

class RoomUrlField extends React.Component {
  state = {
    value: this.getLocation(),
    copied: false
  };

  getLocation() {
    return window.location.href;
  }

  render() {
    return (
      <InputDiv>
        <InputFieldStyled value={this.getLocation()} />

        <CopyToClipboard
          text={this.state.value}
          onCopy={() => this.setState({ copied: true })}
        >
          <CopyBtn>Copy Link </CopyBtn>
        </CopyToClipboard>

        {this.state.copied ? (
          <span style={{ color: "#134b62" }}>Copied</span>
        ) : null}
      </InputDiv>
    );
  }
}

export default RoomUrlField;
