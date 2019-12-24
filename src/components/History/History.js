import React from "react";
import styled from "styled-components";
import Transaction from "./Transaction";

const HistoryWrapper = styled.div`
  margin: 20px;
  width: 80%;
  height: 200px;
  overflow-y: scroll;
`;

const History = ({ historyList }) => {
  return (
    <HistoryWrapper>
      {historyList.map((item, index) => (
        <Transaction key={index} {...item} />
      ))}
    </HistoryWrapper>
  );
};

export default History;
