import React from "react";
import styled from "styled-components";

const PointDiv = styled.div`
  background: #ffffffd4;
  position: absolute;
  top: 10px;
  left: 10px;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const PinTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InputBox = styled.input`
  width: 200px;
  height: 30px;
  font-size: 14px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(202, 202, 202);
  border-image: initial;
  border-radius: 1px;
  margin-bottom: 10px;
`;
const Button = styled.button`
  background-color: rgb(123, 157, 179);
  color: white;
  text-align: center;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  padding: 10px 24px;
  text-decoration: none;
  border-radius: 10px;
`;

const DeleteBtn = styled.button`
  background: url(./images/dustbin.png);
  background-repeat: no-repeat;
  height: 20px;
  cursor: pointer;
  border: none;
  background-size: 20px;
  width: 20px;
`;

const PointInfo = props => (
  <PointDiv>
    <PinTitle>
      <h3>Pin info</h3>
      <DeleteBtn onClick={props.onCreateRoomClick} title="Delete pin" />
    </PinTitle>
    <InputBox
      placeholder="Title"
      onChange={props.onTextChange}
      onKeyDown={props.onTextKeyDown}
    />
    <InputBox
      placeholder="Address"
      onChange={props.onTextChange}
      onKeyDown={props.onTextKeyDown}
    />
    <InputBox
      placeholder="Link"
      onChange={props.onTextChange}
      onKeyDown={props.onTextKeyDown}
    />
    <InputBox
      placeholder="Comment"
      onChange={props.onTextChange}
      onKeyDown={props.onTextKeyDown}
    />
    <Button onClick={props.onCreateRoomClick}>Add pin</Button>
  </PointDiv>
);

export default PointInfo;
