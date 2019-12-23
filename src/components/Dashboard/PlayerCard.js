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
  box-shadow: 10px 10px ${({ hasPhoto }) => hasPhoto ? '0' : '20px'} -16px rgba(0,0,0,0.75);
  height: 60px;
  width: 60px;
  overflow:hidden;
  border-radius: ${({ hasPhoto }) => hasPhoto ? 0 : '100%'};
}

.player-photo {
    background-color: ${({ hasPhoto, isBank }) => isBank ? 'gold' : hasPhoto ? 'transparent' : 'royalblue'};
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    
    img {
      width: 100%;
      height: auto;
    }
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
      hasPhoto={!!player.photo}
      isBank={player.is_bank}
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
