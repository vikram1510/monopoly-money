import React, { useState } from "react";
import styled from "styled-components";
import Button from "../common/Button";
import Dialog from "../common/Dialog";
import api from "../../api/api";

const Header = ({ game, player, getPlayer }) => {
  const [resetDialog, setResetDialog] = useState(false);

  const resetAmount = e => {
    e.preventDefault();
    setResetDialog(false);
    api.updatePlayer(player.id, { amount: 1500, deposit: 0 }).then(getPlayer);
    api.updateGame(game.id, { free_parking: 0 });
  };

  return (
    <>
      <HeaderWrapper>
        <LogoWrapper>
          <Logo
            src={process.env.PUBLIC_URL + "/static/monopolylogo.png"}
            alt="Monopoly"
          ></Logo>
        </LogoWrapper>
        <ResetButton>
          <Button
            bg={"#30263F"}
            padding={"7px"}
            onClick={() => setResetDialog(true)}
          >
            RESET
          </Button>
        </ResetButton>
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
    </>
  );
};

const Logo = styled.img`
  height: 40px;
`;

const LogoWrapper = styled.div`
  margin-bottom: 10px;
`;

const ResetButton = styled.div`
  margin-top: 5px;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default Header;
