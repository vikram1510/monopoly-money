import React from "react";

const TransactionWrapper = `

`;

const Transaction = ({ from_name, to_name, amount, action }) => {
  return (
    <TransactionWrapper>
      <p>{`${from_name} ${action} ${amount} ${to_name}`}</p>
    </TransactionWrapper>
  );
};

export default Transaction;
