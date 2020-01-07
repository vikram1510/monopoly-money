import React, {useState} from 'react'
import Dialog from '../common/Dialog'
import Button from '../common/Button'
import styled from 'styled-components'
import listOfProperties from './listOfProperties'

const Property = styled.div`
  /* padding: 3px 9px;  */
  margin: 5px;
  border-radius:3px;
  background: #efefef;
  display: flex;
  height:45px;
  
  div.color {
    flex: 1;
    margin-right:10px;
    border: solid black 1px;
  }
  div.info {
    flex: 6;
    display: flex;
    justify-content: space-between;
    align-items:center;
    font-weight:800;
    font-size: 14px;
  }
  .buttons {
    display: flex;
    > button {
      font-size: 15px;
      width: 40px;
      height:45px;

      padding: 5px;
      border-radius:3px;
    }
    > button:first-of-type {
      margin-right: 10px;
    }

    .full-price {
      background-color: #1575d9;
    }

    .mortgage {
      width: 35px;
      background-color: indianred;
    }
  }
`;

const PropertyListWrapper = styled.div`
  height:70vh;
  overflow:scroll;
`;
  
const PropertyList = ({from,to, sendPaymentFunc, togglePropertyList, showPropertyList }) => {


const handleSubmit = (amount) => {

  togglePropertyList(false)
  sendPaymentFunc(to, from, amount)

}

return (
  <Dialog open={showPropertyList} closeFunction={() => togglePropertyList(false)}>
    <PropertyListWrapper>
    {listOfProperties.map(property => (   
        renderProperty(property, handleSubmit)))}
    </PropertyListWrapper>
  </Dialog>
)
}


const renderProperty = ({name,value,color}, handleSubmit) => {

  return (
    <Property>
      <div className="color" style={{ backgroundColor: color}}>
      </div>
      <div className="info">
        <h4>{name}</h4>
        <div className="buttons">
          <Button className="full-price" onClick={() => handleSubmit(value)}>{value}</Button>
          <Button className="mortgage" onClick={() => handleSubmit(value/2)}>{value/2}</Button>
        </div>
      </div>
    </Property>
  )

}

export default PropertyList


