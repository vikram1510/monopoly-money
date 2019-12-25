import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Transaction from "./Transaction";

const HistoryWrapper = styled.div`
  padding: 20px;
  width: 100%;
  height: calc(100% - 400px);
  overflow-y: scroll;
`;

const History = ({ historyList }) => {
  const [showTimeId, setShowTimeId] = useState(0)
  return (
    <HistoryWrapper>
      {historyList.sort((a,b) => b.id - a.id).map(item => (
        <Transaction key={item.id} {...item} showTimeId={showTimeId} onClick={() => setShowTimeId(item.id)} />
      ))}
    </HistoryWrapper>
  );
};

export default History;
