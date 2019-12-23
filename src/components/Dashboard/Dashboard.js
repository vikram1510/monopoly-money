// https://i.pinimg.com/originals/b0/b2/48/b0b248f91cefb344ec92b272eadd860b.png
import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import api from "../../api/api";
import { Nav, NavOption } from "./Nav";

import Auth from "../../lib/auth";
import SendPayment from "./SendPayment";
import Leaderboard from "./Leaderboard";
import PlayerCard from "./PlayerCard";
import Button from "../common/Button";
import Dialog from "../common/Dialog";
import AmountSetter from "../Dashboard/AmountSetter";
import CountUp from "react-countup";
import Input from "../common/Input";
import CardDisplay from "./CardDisplay";
import Header from "./Header";

const Dashboard = props => {
  const [player, setPlayer] = useState();
  const [navOption, setNavOption] = useState("payment");
  const [game, setGame] = useState();

  const [addDepDialog, setAddDepDialog] = useState(false);
  const [deposit, setDeposit] = useState(0);

  const [collDepDialog, setCollDepDialog] = useState(false);
  const [collDeposit, setCollDeposit] = useState(0);
  const [atBank, setAtBank] = useState(true);

  const [addFpDialog, setAddFpDialog] = useState(false);
  const [fpAmount, setFpAmount] = useState(0);

  const [collFpDialog, setCollFpDialog] = useState(false);

  const [collSalDialog, setCollSalDialog] = useState(false);

  const getPlayer = () => {
    const playerId = Auth.getToken();
    console.log("getPlayer");
    api.getPlayer(playerId).then(player => setPlayer(player));
  };

  useEffect(() => {
    setInterval(getPlayer, 3000);
  }, []);

  useEffect(() => {
    // console.log(player);
    if (player) {
      api.getGame(player.game).then(game => setGame(game));
    }
  }, [player]);

  const sendPayment = (to, from, amount) => {
    api.sendPayment(game.id, { to, from, amount }).then(getPlayer);
  };

  const navSelect = e => setNavOption(e.target.value);

  const depositFunction = (e, amount, action, atBank = null) => {
    e.preventDefault();

    const at_bank = atBank ? true : false;
    api.updateDeposit(player.id, { amount, action, at_bank }).then(getPlayer);
    setAddDepDialog(false);
    setCollDepDialog(false);
  };

  const addFreeParking = (e, amount) => {
    e.preventDefault();
    api.freeParkingAdd(game.id, { amount, player: player.id }).then(getPlayer);
    setAddFpDialog(false);
  };

  const splitFreeParking = e => {
    e.preventDefault();
    api.freeParkingSplit(game.id, { player: player.id }).then(getPlayer);
    setCollFpDialog(false);
  };

  const collectSalary = e => {
    e.preventDefault();
    const bankId = game.players.find(pl => pl.name.startsWith("Bank")).id;
    const amount = 200 + parseInt(player.deposit * 0.25);
    sendPayment(player.id, bankId, amount);
    setCollSalDialog(false);
  };

  const topWrapperStyles = {
    fontFamily: "Poppins",
    backgroundColor: "mediumseagreen",
    width: "100%",
    height: "250px",
    padding: "5px 15px 15px 15px",
    marginBottom: "10px"
  };

  if (!game) return null;
  return (
    <div className="container">
      <div style={topWrapperStyles}>
        <Header game={game} player={player} getPlayer={getPlayer} />
        <CardDisplay game={game} player={player} getPlayer={getPlayer} />
      </div>
      <div className="dashboard">
        {/* <div className="top">
        <h1>{game.name.replace(/^\w/, c => c.toUpperCase())}</h1>
        <Button onClick={() => setResetDialog(true)}>RESET</Button>
        </div>
        <div className="info">
          <PlayerCard player={player} showAmount={false} onClick={() => setProfileDialog(true)} />
          <CountUp startOnMount={false} end={player.amount} prefix={'$'} duration={2} preserveValue={true}/>
        </div>
        <div className="deposit-fp">
          <div>
            <label>Deposit</label>
            <CountUp startOnMount={false} end={player.deposit} prefix={'$'} duration={2} preserveValue={true}/>
          </div>
          <div>
            <label>Free Parking</label>
            <CountUp startOnMount={false} end={game.free_parking} prefix={'$'} duration={2} preserveValue={true}/>
          </div>
        </div> */}
        <div className="action-buttons">
          <Button
            onClick={() => setCollSalDialog(true)}
            className="collect-salary"
          >
            Collect Salary
          </Button>
          <Button onClick={() => setAddDepDialog(true)} className="add-deposit">
            Add Deposit
          </Button>
          <Button
            onClick={() => setCollDepDialog(true)}
            className="collect-deposit"
          >
            Withdraw Deposit
          </Button>
          <Button onClick={() => setAddFpDialog(true)} className="add-fp">
            Add Free Parking
          </Button>
          <Button onClick={() => setCollFpDialog(true)} className="collect-fp">
            Collect Free Parking
          </Button>
        </div>
        <Nav>
          <NavOption
            selectedNavValue={navOption}
            navValue={"payment"}
            onChange={navSelect}
            navText="Money"
          />
          <NavOption
            selectedNavValue={navOption}
            navValue={"leaderboard"}
            onChange={navSelect}
            navText="Leaderboard"
          />
        </Nav>
      </div>
      {navOption === "payment" && (
        <SendPayment
          others={game.players.filter(pl => pl.id !== player.id)}
          fromPlayer={player}
          sendPaymentFunc={sendPayment}
        />
      )}
      {navOption === "leaderboard" && <Leaderboard />}
      <Dialog open={addDepDialog} closeFunction={() => setAddDepDialog(false)}>
        <form
          onSubmit={e => depositFunction(e, deposit, "add")}
          className="add-deposit"
        >
          <AmountSetter amount={deposit} setAmount={setDeposit}></AmountSetter>
          <Button>Add Deposit</Button>
        </form>
      </Dialog>
      <Dialog
        open={collDepDialog}
        closeFunction={() => setCollDepDialog(false)}
      >
        <form
          onSubmit={e => depositFunction(e, collDeposit, "collect", atBank)}
          className="collect-deposit"
        >
          <AmountSetter
            amount={collDeposit}
            setAmount={setCollDeposit}
            max={player.deposit}
          ></AmountSetter>
          <div className="submit">
            <div className="at-go">
              <input
                id="at-bank"
                type="checkbox"
                onChange={e => setAtBank(e.target.checked)}
                checked={atBank}
              ></input>
              <label htmlFor="at-bank">I'm at Go</label>
            </div>
            <Button>Collect Deposit</Button>
          </div>
        </form>
      </Dialog>
      <Dialog open={addFpDialog} closeFunction={() => setAddFpDialog(false)}>
        <form
          onSubmit={e => addFreeParking(e, fpAmount)}
          className="add-deposit"
        >
          <AmountSetter
            amount={fpAmount}
            setAmount={setFpAmount}
          ></AmountSetter>
          <Button>Add Free Parking</Button>
        </form>
      </Dialog>
      <Dialog open={collFpDialog} closeFunction={() => setCollFpDialog(false)}>
        <form onSubmit={splitFreeParking} className="yes-cancel">
          <div className="message">
            <p>Are you sure?</p>
            <p>
              You will receive{" "}
              {parseInt(Math.round(game.free_parking / 2 / 5) * 5)}
            </p>
          </div>
          <div className="buttons">
            <Button className="yes">Yes</Button>
            <Button className="cancel" onClick={() => setCollFpDialog(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </Dialog>
      <Dialog
        open={collSalDialog}
        closeFunction={() => setCollSalDialog(false)}
      >
        <form onSubmit={collectSalary} className="yes-cancel">
          <div className="message">
            <p>You will receive {parseInt(200 + player.deposit * 0.25)}</p>
          </div>
          <div className="buttons">
            <Button className="yes">Yes</Button>
            <Button className="cancel" onClick={() => setCollSalDialog(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default Dashboard;
