import React, {useEffect, useState} from "react";
import styled from "styled-components";
import CountUp from "react-countup";
import PlayerPhoto from "../common/PlayerPhoto";

const PlayerCardStyle = styled.div`
  width: 60px;
  text-align: center;
  h4 {
    font-weight: bold;
    margin: 10px 0px 5px;
  }
`;

const PlayerCard = ({
  player,
  onClick = null,
  showAmount = true,
  animateOnRender = true
}) => {

  const [amountStartValue, setAmountStartValue] = useState()
  const [depositStartValue, setDepositStartValue] = useState()

  useEffect(() => {
    if (!animateOnRender) {
      setAmountStartValue(player.amount)
      setDepositStartValue(player.deposit)
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [animateOnRender])
  return (
    <PlayerCardStyle onClick={onClick}>
      <PlayerPhoto
        photo={player.photo}
        name={player.name}
        hasPhoto={!!player.photo}
        isBank={player.is_bank}
      />
      <h4>{player.name.split("-")[0].replace(/^\w/, c => c.toUpperCase())}</h4>
      {showAmount && !player.is_bank && (
        <>
          <div style={{ fontWeight: "800", marginBottom: "5px" }}>
            <CountUp
              start={amountStartValue}
              end={player.amount}
              prefix={"$"}
              duration={2}
              preserveValue={true}
            />
          </div>
          <div style={{ fontSize: "13px", color: "gray" }}>
            <CountUp
            start={depositStartValue}
              end={player.deposit}
              prefix={"$"}
              duration={2}
              preserveValue={true}
            />
          </div>
        </>
      )}
    </PlayerCardStyle>
  );
};

export default PlayerCard;
