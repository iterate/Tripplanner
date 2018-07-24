import styled from "styled-components";

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
  padding-left: 5px;
  &:focus {
    outline: none;
    border: 1px solid #134b62;
  }
`;

export default InputBox;
