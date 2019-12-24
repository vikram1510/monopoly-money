import React, { useState } from "react";
import styled from "styled-components";
import api from "../../api/api";

import Dialog from "../common/Dialog";
import Input from "../common/Input";
import Button from "../common/Button";
import ValueDisplay from "../common/ValueDisplay";
import PlayerPhoto from "../common/PlayerPhoto";
import CountableNum from "../common/CountableNum";

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

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LastUpdate = styled.p`
  font-size: 10px;
  color: grey;
`;

const CardDisplay = ({ game, player, getPlayer, lastUpdated }) => {
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
        <TopRow>
          <div>
            <PlayerName>{player.name.toUpperCase()}</PlayerName>
            <GameName>{game.name.toUpperCase()}</GameName>
            <PlayerAmount>
              <CountableNum value={player.amount} />
            </PlayerAmount>
            <LastUpdate>
              Last updated{" "}
              {lastUpdated.toLocaleTimeString("en-GB", {
                hour: "numeric",
                minute: "numeric",
                second: "numeric"
              })}
            </LastUpdate>
          </div>
          <div onClick={() => setProfileDialog(true)}>
            <PlayerPhoto
              photo={player.photo}
              name={player.name}
              hasPhoto={!!player.photo}
              width={"80px"}
              height={"80px"}
            />
          </div>
        </TopRow>
        <BottomRow>
          <ValueDisplay
            label={"Free Parking"}
            value={game.free_parking}
          ></ValueDisplay>
          <ValueDisplay label={"Deposit"} value={player.deposit}></ValueDisplay>
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
