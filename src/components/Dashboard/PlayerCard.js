import React from "react";
import styled from "styled-components";
import CountUp from "react-countup";

const PlayerCardStyle = styled.div`
  width: 60px;
  text-align: center;
  h4 {
    font-weight: bold;
    margin: 10px 0px 5px;
  }

  
.player-container {
  height: 60px;
  -webkit-box-shadow: 10px 10px 20px -16px rgba(0,0,0,0.75);
-moz-box-shadow: 10px 10px 20px -16px rgba(0,0,0,0.75);
box-shadow: 10px 10px 20px -16px rgba(0,0,0,0.75);
  width: 60px;
  overflow:hidden
  border-radius: 100px;
}

.player-photo {
  
    background-color:  ${({ cardColor }) =>
      cardColor ? cardColor : "royalblue"};
    height: 60px;
    width: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    img {
      height: 100%;
      width: auto;
    }
  
`;

const PlayerCard = ({
  player,
  onClick = null,
  showAmount = true,
  animateCount = true
}) => {
  return (
    <PlayerCardStyle
      onClick={onClick}
      cardColor={
        player.is_bank ? "gold" : player.photo ? "transparent" : "royalblue"
      }
    >
      <div className="player-container">
        <div className="player-photo">
          {player.photo && (
            <img src={player.photo} alt={player.name + " photo"}></img>
          )}
        </div>
      </div>
      <h4>{player.name.split("-")[0].replace(/^\w/, c => c.toUpperCase())}</h4>
      {showAmount && !player.is_bank && (
        <>
          <div style={{ fontWeight: "800", marginBottom: "5px" }}>
            <CountUp
              start={!animateCount && player.amount}
              end={player.amount}
              prefix={"$"}
              duration={2}
              preserveValue={true}
            />
          </div>
          <div style={{ fontSize: "13px", color: "gray" }}>
            <CountUp
              start={!animateCount && player.deposit}
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
