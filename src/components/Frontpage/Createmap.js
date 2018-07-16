import React from "react";
import styled from "styled-components";

const CreateMapDiv = styled.div`
  font-weight: 300;
  background: rgba(255, 255, 255, 0.92);
  padding: 20px;
  display: -ms-flexbox;
  display: flex;
  width: 400px;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  align-self: flex-end;
  margin-right: 20px;
  margin-top: 20px;
`;
const CreateMapTitle = styled.h3``;

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
  border-radius: 4px;
  margin: 10px 20px;
  width: 60%;
`;

const Createmap = props => (
  <CreateMapDiv>
    <h3>Create a room, start planning</h3>
    <div>
      <span>Adresse.in/</span>
      <InputBox
        placeholder="Groupname, tripname or other"
        onChange={props.onTextChange}
        onKeyDown={props.onTextKeyDown}
      />
    </div>
    <Button onClick={props.onCreateRoomClick}>Create room</Button>
    <span>Already have a map? Visit exsisting map</span>
  </CreateMapDiv>
);

export default Createmap;
