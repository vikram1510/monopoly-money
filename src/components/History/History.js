import React from "react";
import styled from "styled-components";
import Transaction from "./Transaction";

const HistoryWrapper = styled.div`
  padding: 20px;
`;

const History = ({ historyList }) => {
  return (
    <HistoryWrapper>
      historyList.forEach({item => <Transaction {...item} />}});
    </HistoryWrapper>
  );
};

export default History;
