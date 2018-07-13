import React from "react";
import styled from "styled-components";

const CreateMapDiv = styled.div`
  font-weight: 300;
  position: absolute;
  z-index: 100;
  top: 250px;
  right: 10%;
  background: rgba(255, 255, 255, 0.92);
  padding: 20px;
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
  border-radius: 10px;
  margin: 10px 20px;
`;

const Createmap = () => (
  <CreateMapDiv>
    <h3>Create a room, start planning</h3>
    <div>
      <span>Adresse.in/</span>
      <InputBox placeholder="Groupname, tripname or other" />
    </div>
    <Button>Create room</Button>
    <span>Already have a room? enter exsisting room</span>
  </CreateMapDiv>
);

export default Createmap;
