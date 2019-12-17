import styled from 'styled-components'
import React from 'react'

const borderThickness = '4px'
const navColor = 'gray'

const NavStyle = styled.nav`
  background-color: ${navColor};
  display: flex;
  height: 40px;
  align-items: center;
  justify-content: space-around;

  label {
    color: white;
    width:100%;
    height: 100%;
    text-align: center;
    padding: 10px 0;
    cursor: pointer;
    border-top: ${borderThickness} transparent solid;
  }

  input:checked + label {
    background-color: white;
    color: ${navColor};
    border-top: ${borderThickness} ${navColor} solid;
  }

`
export const NavOption = ({ selectedNavValue, navValue, onChange, navText}) => {
  return (
    <>
      <input 
        id={'navId-' + navValue}
        type="radio"
        value={navValue}
        checked={selectedNavValue === navValue}
        onChange={onChange}
        style={{ display: 'none' }}
      ></input>
      <label htmlFor={'navId-' + navValue}>{navText}</label>
    </>
  )
}

export const Nav = ({ children }) => {

  return (
    <NavStyle>
      {children}
    </NavStyle>
  )
  
}


