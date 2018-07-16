import React from "react";
import styled from "styled-components";

const PointDiv = styled.div`
  background: #ffffffb8;
  height: 450px;
  position: absolute;
  top: 10px;
  left: 10px;
  max-width: 400px;
  display: flex;
  flex-direction: column;
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
  margin-left: 10px;
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
  margin: 10px 20px;
`;

const PointInfo = props => (
  <PointDiv>
    <span>Dette er en tittel</span>
    <h3>Point info</h3>
    <div>
      <span>Adresse.in/</span>
      <InputBox
        placeholder="Groupname, tripname or other"
        onChange={props.onTextChange}
        onKeyDown={props.onTextKeyDown}
      />
      <InputBox
        placeholder="Groupname, tripname or other"
        onChange={props.onTextChange}
        onKeyDown={props.onTextKeyDown}
      />
      <InputBox
        placeholder="Groupname, tripname or other"
        onChange={props.onTextChange}
        onKeyDown={props.onTextKeyDown}
      />
    </div>
    <Button onClick={props.onCreateRoomClick}>Create room</Button>
    <span>Already have a room? enter exsisting room</span>
  </PointDiv>
);

export default PointInfo;
