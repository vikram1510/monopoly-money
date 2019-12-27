import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import moment from 'moment'

const TransactionWrapper = styled.div`

  display: flex;
  justify-content: space-between;
  align-items: center;

  p.transaction{
    padding: 10px;
    background-color: ${({ backgroundCol }) => backgroundCol};
    color: ${({textCol}) => textCol};
    border-radius: 10px;
    margin-bottom: 5px;
    margin-right: 10px;
    flex-grow:1;
  }
  p.time {
    color: gray;
    font-size: 10px;
    line-height:1.6;
    max-width: 100px;
    display: flex;
    flex-direction: column;
  }


`;

const Transaction = ({ id, from_name, to_name, amount, action, created, showTimeId, onClick, defaultBg, useAsTextCol }) => {

  const color = defaultBg ? defaultBg : getBackgroundColor({from_name, to_name})
  const textCol = useAsTextCol ? color : undefined;
  const backgroundCol = useAsTextCol ? undefined: color;
  const transactionText = getTransactionText({from_name, to_name, amount, action})

  return (
    <TransactionWrapper backgroundCol={backgroundCol} textCol={textCol}>
      <p className="transaction" onClick={onClick}>
      {transactionText}
      </p>
      {showTimeId === id &&
      <p className="time">
        <span>{moment(created).fromNow()}</span> 
        <span>{moment(created).format('MMM Do HH:mm')}</span>
      </p>
      }

    </TransactionWrapper>
  );
};

const formatName = name => {
    return name.split("-")[0].replace(/^\w/, c => c.toUpperCase());
};


const getTransactionText = ({from_name, to_name, amount, action}) => {

  const FROM_ACTIONS = ['withdrew','collected','received']
  const AT_GO_ACTION = ['withdrew at Go']

  if (AT_GO_ACTION.some(c => action.includes(c))) {
    return `${formatName(to_name)} withdrew ${amount} from ${formatName(from_name)} at GO`
  } 
  if (FROM_ACTIONS.some(c => action.includes(c))) {
    return `${formatName(to_name)} ${action} ${amount} from ${formatName(from_name)}`
  } 

  return `${formatName(from_name)} ${action} ${amount} to ${formatName(to_name)}`

}

const getBackgroundColor = ({from_name, to_name,}) => {
  
  const defaultCol = '#3684D8'

  const COLOR_LIST_TO = {
    'Bank' : 'hsl(348, 100%, 70%)',
    'Free Parking' : '#009FB7',
    'Deposit' : '#696773',
  }

  const COLOR_LIST_FROM = {
    'Bank' : 'hsl(141, 53%, 57%)',
    'Free Parking' : '#73CAD7',
    'Deposit' : '#ADACB2',
  }

  if (COLOR_LIST_FROM[formatName(from_name)]) return COLOR_LIST_FROM[formatName(from_name)]
  if (COLOR_LIST_TO[formatName(to_name)]) return COLOR_LIST_TO[formatName(to_name)]
  return defaultCol

}

export default Transaction;
