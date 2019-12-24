import React from "react";
import styled from "styled-components";

import CountUp from "react-countup";

import CountableNum from "./CountableNum";

const ValueDisplay = ({ value, label }) => (
  <TitleAmount>
    <Title>{label}</Title>
    <Amount>
      <CountableNum value={value} />
    </Amount>
  </TitleAmount>
);

const TitleAmount = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-weight: 1000;
`;

const Amount = styled.div`
  text-align: center;
  padding: 5px;
`;

export default ValueDisplay;
