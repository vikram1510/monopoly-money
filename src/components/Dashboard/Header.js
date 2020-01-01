import React, { useState } from "react";
import styled from "styled-components";
import Button from "../common/Button";
import Dialog from "../common/Dialog";
import api from "../../api/api";
import { withRouter } from 'react-router-dom'

const Header = ({ game, player, getPlayer, history }) => {
  const [resetDialog, setResetDialog] = useState(false);
  const [leaveDialog, setLeaveDialog] = useState(false);

  const resetAmount = e => {
    e.preventDefault();
    setResetDialog(false);
    api.updatePlayer(player.id, { amount: 1500, deposit: 0 }).then(getPlayer);
    api.updateGame(game.id, { free_parking: 0, history: [] });
  };

  const leaveGame = e => {
    e.preventDefault();
    setLeaveDialog(true);
    api.updatePlayer(player.id, { game: null}).then(getPlayer)
    .then(() => history.push('/home'))
  }

  return (
    <>
      <HeaderWrapper>
        <LogoWrapper>
          <Logo
            src={process.env.PUBLIC_URL + "/static/monopolylogo.png"}
            alt="Monopoly"
          ></Logo>
        </LogoWrapper>
        <div className="top-buttons">
          <ButtonContainer>
          <Button bg={"#a20b0b"} className="leave-game" onClick={() => setLeaveDialog(true)}>
            LEAVE
          </Button>
          </ButtonContainer>
          <ButtonContainer>
            <Button
              bg={"#30263F"}
              onClick={() => setResetDialog(true)}
            >
              RESET
            </Button>
          </ButtonContainer>
        </div>

      </HeaderWrapper>
      <Dialog open={resetDialog} closeFunction={() => setResetDialog(false)}>
        <form onSubmit={resetAmount} className="yes-cancel">
          <div className="message">
            <p>The game will be reset</p>
            <p style={{ fontWeight: 1000 }}>Are you sure?</p>
          </div>
          <div className="buttons">
            <Button className="yes">YES</Button>
            <Button className="cancel" onClick={() => setResetDialog(false)}>
              NO
            </Button>
          </div>
        </form>
      </Dialog>
      <Dialog open={leaveDialog} closeFunction={() => setLeaveDialog(false)}>
        <form onSubmit={leaveGame} className="yes-cancel">
          <div className="message">
            <p>You're about to leave this game: {game.name}</p>
            <p style={{ fontWeight: 1000 }}>Are you sure?</p>
          </div>
          <div className="buttons">
            <Button className="yes">YES</Button>
            <Button className="cancel" onClick={() => setLeaveDialog(false)}>
              NO
            </Button>
          </div>
        </form>
      </Dialog>
    </>
  );
};

const Logo = styled.img`
  height: 40px;
`;

const LogoWrapper = styled.div`
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  margin-top: 5px;
  margin-left:5px;
`;


const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default withRouter(Header)
