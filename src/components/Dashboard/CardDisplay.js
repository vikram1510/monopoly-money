import React, { useState } from "react";
import styled from "styled-components";
import api from "../../api/api";

import CountUp from "react-countup";
import Dialog from "../common/Dialog";
import Input from "../common/Input";
import Button from "../common/Button";

const Card = styled.div`
  background-color: white;
  border-radius: 10px;
  width: 100%;
  height: 75%;
  padding: 20px;

  &:active {
    -webkit-transition: 0.5s;
    padding: 10px;
  }
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

const TopRow = styled.div`
display: flex;
justify-content: space-between;

.player-container {
box-shadow: 10px 10px ${({ hasPhoto }) => hasPhoto ? '0' : '20px'} -16px rgba(0,0,0,0.75);
  height: 80px;
  width: 80px;
  overflow:hidden;
  border-radius: ${({ hasPhoto }) => hasPhoto ? 0 : '100%'};
}

.player-photo {
    background-color: ${({ hasPhoto }) => hasPhoto ? 'transparent' : 'royalblue'};
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

const CardDisplay = ({ game, player, getPlayer }) => {
  const [profileDialog, setProfileDialog] = useState(false);

  const [profile, setProfile] = useState({ photo: "", color: "" });

  const saveProfile = e => {
    e.preventDefault();
    api.updatePlayer(player.id, { photo: profile.photo }).then(getPlayer);
    setProfileDialog(false);
    setProfile({ photo: player.photo, color: player.color });
  };

  return (
    <>
      <Card
        onClick={() => {
          getPlayer();
        }}
      >
        <TopRow hasPhoto={!!player.photo}>
          <div>
            <PlayerName>{player.name.toUpperCase()}</PlayerName>
            <GameName>{game.name.toUpperCase()}</GameName>
            <PlayerAmount>
              <CountUp
                startOnMount={true}
                end={player.amount}
                prefix={"$"}
                duration={2}
                preserveValue={true}
              />
            </PlayerAmount>
            {/* <LastUpdate>Last updated: 5s</LastUpdate> */}
          </div>
          <div className="player-container">
            <div
              onClick={() => setProfileDialog(true)}
              className="player-photo"
            >
              {player.photo && (
                <img src={player.photo} alt={player.name + " photo"}></img>
              )}
            </div>
          </div>
        </TopRow>
        <BottomRow>
          <TitleAmount>
            <Title>Free Parking</Title>
            <Amount>
              <CountUp
                startOnMount={true}
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
                startOnMount={true}
                end={player.deposit}
                prefix={"$"}
                duration={2}
                preserveValue={true}
              />
            </Amount>
          </TitleAmount>
        </BottomRow>
      </Card>
      <Dialog
        open={profileDialog}
        closeFunction={() => setProfileDialog(false)}
      >
        <form onSubmit={saveProfile} className="set-profile">
          <Input
            className="photo"
            placeholder="photo"
            value={profile.photo}
            onChange={e => setProfile({ ...profile, photo: e.target.value })}
          ></Input>
          {/* <Input className="color" placeholder="color" value={profile.color} onChange={(e) => setProfile({...profile, color: e.target.value})}></Input> */}
          <Button>Submit</Button>
        </form>
      </Dialog>
    </>
  );
};

export default CardDisplay;
