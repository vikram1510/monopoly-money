import styled from "styled-components";

const Button = styled.button`
  font-family: "Poppins";
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "16px")};
  background-color: ${({ bg }) => (bg ? bg : "#1CA7DF")};
  padding: ${({ padding }) => (padding ? padding : "10px")};
  color: white;
  border: 0;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
`;

export default Button;
