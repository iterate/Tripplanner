import React, { Component } from "react";
import styled from "styled-components";

const PointDiv = styled.div`
  background: #ffffffd4;
  position: absolute;
  top: 200px;
  left: 10px;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  font-family: "roboto-light", sans-serif;
`;

const PinTitle = styled.h3``;
const PointLink = styled.a`
  color: #618f9b;
`;
const PointSpan = styled.span`
  margin: 20px 0;
`;

const Button = styled.button`
  background-color: rgb(123, 157, 179);
  color: white;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  border-width: initial;
  border-style: none;
  padding: 10px 24px;
  text-decoration: none;
  border-radius: 10px;
`;

class PointInfoAdded extends Component {
  editBtn() {
    alert("Edit");
  }

  getLink() {
    return "https://" + this.props.link;
  }
  render() {
    return (
      <PointDiv>
        <PinTitle>{this.props.title}</PinTitle>
        <PointLink
          target="_blank"
          rel="noopener noreferrer"
          href={this.getLink()}
        >
          Link
        </PointLink>
        <PointSpan>{this.props.comment}</PointSpan>
        <Button onClick={this.editBtn}>Edit pin</Button>
      </PointDiv>
    );
  }
}

export default PointInfoAdded;
