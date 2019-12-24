import React from "react";
import styled from "styled-components";

const TransactionWrapper = styled.div`
  padding: 10px;
  background-color: ${({ backgroundCol }) => backgroundCol};
  border-radius: 10px;
  margin-bottom: 5px;
`;

const Transaction = ({ from_name, to_name, amount, action }) => {
  let backgroundCol = "#AED6F1";

  if (from_name.includes("Bank-") || to_name.includes("Bank")) {
    backgroundCol = "#F9E79F ";
  }

  return (
    <TransactionWrapper backgroundCol={backgroundCol}>
      <p>
        {formatName(from_name)} {action} {amount} to {formatName(to_name)}
      </p>
    </TransactionWrapper>
  );
};

const formatName = name => {
  return name.split("-")[0].replace(/^\w/, c => c.toUpperCase());
};

export default Transaction;
