import styled from "styled-components";

const Button = styled.button`
  font-size: 16px;
  background-color: ${props => (props.bg ? props.bg : "#1CA7DF")};
  padding: 10px;
  color: white;
  border: 0;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
`;

export default Button;
