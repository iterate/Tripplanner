import styled from "styled-components";

const Button = styled.button`
  background-color: #618f9b;
  color: white;
  text-align: center;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-style: none;

  padding: 10px 24px;
  text-decoration: none;
  border-radius: 4px;
  margin: 10px 20px;
  width: 60%;
  &:hover {
    filter: brightness(120%);
  }
  &:focus {
    outline: none;
  }
`;
export default Button;
