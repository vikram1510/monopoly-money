import React from "react";
import styled from "styled-components";
import CountUp from "react-countup";

const Card = styled.div`
  background-color: white;
  border-radius: 10px;
  width: 100%;
  height: 75%;
  padding: 20px;
`;

const PlayerName = styled.p`
  font-size: 20px;
  font-weight: 1000;
`;

const GameName = styled.p`
  font-size: 13px;
  font-weight:500;
  margin-top: 5px;
  margin-bottom:10px
  color: grey;
`;

const PlayerAmount = styled.p`
  font-size: 40px;
  font-weight: 1000;
`;

const BottomRow = styled.div`
  display: flex;
  font-family: "Poppins";
  margin-top: 20px;
  justify-content: space-around;
`;

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
const LastUpdate = styled.p`
  font-size: 13px;
  color: grey;
`;

const TopRow = styled.div`
display: flex;
justify-content: space-between;

.player-photo {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    img {
      height: 100%;
      width: auto;
    }
`;

const CardDisplay = ({ game, player, getPlayer }) => {
  return (
    <Card>
      <TopRow>
        <div>
          <PlayerName>{player.name.toUpperCase()}</PlayerName>
          <GameName>{game.name.toUpperCase()}</GameName>
          <PlayerAmount>
            <CountUp
              startOnMount={false}
              end={player.amount}
              prefix={"$"}
              duration={2}
              preserveValue={true}
            />
          </PlayerAmount>
          {/* <LastUpdate>Last updated: 5s</LastUpdate> */}
        </div>
        <div className="player-photo">
          {player.photo && (
            <img src={player.photo} alt={player.name + " photo"}></img>
          )}
        </div>
      </TopRow>
      <BottomRow>
        <TitleAmount>
          <Title>Free Parking</Title>
          <Amount>
            <CountUp
              startOnMount={false}
              end={game.free_parking}
              prefix={"$"}
              duration={2}
              preserveValue={true}
            />
          </Amount>
        </TitleAmount>
        <TitleAmount>
          <Title>Deposit</Title>
          <Amount>
            <CountUp
              startOnMount={false}
              end={player.deposit}
              prefix={"$"}
              duration={2}
              preserveValue={true}
            />
          </Amount>
        </TitleAmount>
      </BottomRow>
    </Card>
  );
};

export default CardDisplay;
