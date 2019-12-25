import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from 'moment'

const TransactionWrapper = styled.div`

  display: flex;
  justify-content: space-between;
  align-items: center;

  p.transaction{
    padding: 10px;
    background-color: ${({ backgroundCol }) => backgroundCol};
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

const Transaction = ({ id, from_name, to_name, amount, action, created, showTimeId, onClick }) => {
  let backgroundCol = "#AED6F1";

  if (from_name.startsWith("Bank-") || to_name.startsWith("Bank")) {
    backgroundCol = "#F9E79F ";
  }

  return (
    <TransactionWrapper backgroundCol={backgroundCol}>
      <p className="transaction" onClick={onClick}>
        {formatName(from_name)} {action} {amount} to {formatName(to_name)}
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

export default Transaction;
