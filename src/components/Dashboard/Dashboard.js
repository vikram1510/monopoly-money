import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { Nav, NavOption } from './Nav'

import Auth from '../../lib/auth'
import SendPayment from './SendPayment'
import Leaderboard from './Leaderboard'
import PlayerCard from './PlayerCard'
import Button from '../common/Button'
import Dialog from '../common/Dialog'
import AmountSetter from '../Dashboard/AmountSetter'

const Dashboard = props => {

  const [player, setPlayer] = useState()
  const [navOption, setNavOption] = useState('payment')
  const [game, setGame] = useState()

  const [addDepDialog, setAddDepDialog] = useState(false)
  const [deposit, setDeposit] = useState(0)

  const [collDepDialog, setCollDepDialog] = useState(false)
  const [collDeposit, setCollDeposit] = useState(0)
  const [atBank, setAtBank] = useState(true)

  const getPlayer = () => {
    console.log('hello')
    const playerId = Auth.getToken()
    axios.get('/api/players/' + playerId).then(res => setPlayer(res.data))
      .catch(err => console.log('oh shit', err.response.data))
  }

  useEffect(getPlayer,[])

  useEffect(() => {
    if (player){
      axios.get('/api/games/' + player.game).then(res => setGame(res.data))
        .catch(err => console.log('oh shit', err.response.data))
    }
  }, [player])

  const sendPayment = (to, from, amount) => {
    axios.post(`/api/games/${game.id}/payment`, { to, from, amount})
      .then(getPlayer)
      .catch(err => console.log(err.response.data))
  }

  const navSelect = e => setNavOption(e.target.value)

  const resetAmount = () => {
    axios.patch('/api/players/'+player.id, { amount: 1500 }).then(getPlayer)
      .catch(err => console.log('reset failed', err.response.data))
  }

  const depositFunction = (e, amount, action, atBank = null) => {
    e.preventDefault()

    const payload = { amount, action }
    if (atBank !== null) payload.at_bank = atBank
    axios.post('/api/players/'+player.id+'/deposit', payload).then(getPlayer)
      .then(() => setAddDepDialog(false))
      .then(() => setDeposit(0))
      .catch(err => console.log('deposit failed', err.response.data))
  }

  if (!game) return null
  return (
    <div className="container">
      <div className="dashboard">
        <div className="top">
        <h1>Game: {game.name}</h1>
        <Button onClick={resetAmount}>RESET</Button>
        </div>
        <div className="deposit">
        <h1>Deposit: {player.deposit}</h1>
        </div>
        <div className="info">
          <PlayerCard player={player} />
          <h2>{player.amount}</h2>
          <Button onClick={getPlayer}><i className="fas fa-sync-alt"></i></Button>
        </div>
        <div className="action-buttons">
        <Button onClick={() => setAddDepDialog(true)} className="add-deposit">Add Deposit</Button>
        <Button onClick={() => setCollDepDialog(true)} className="collect-deposit">Collect Deposit</Button>
        <Button className="deposit">Deposit</Button>
        <Button className="deposit">Deposit</Button>
        <Button className="deposit">Deposit</Button>
        <Button className="deposit">Deposit</Button>
        <Button className="deposit">Deposit</Button>
        <Button className="deposit">Deposit</Button>
      </div>
        <Nav>
          <NavOption  selectedNavValue={navOption} navValue={'payment'} onChange={navSelect} navText="Money"/>
          <NavOption  selectedNavValue={navOption} navValue={'leaderboard'} onChange={navSelect} navText="Leaderboard"/>
        </Nav>
      </div>
      {navOption === 'payment' && 
      <SendPayment 
        others={game.players.filter( pl => pl.id !== player.id)}
        fromPlayer={player}
        sendPaymentFunc={sendPayment}
      />}
      {navOption === 'leaderboard' && <Leaderboard />}
      <Dialog open={addDepDialog} closeFunction={() => setAddDepDialog(false)}>
        <form onSubmit={e => depositFunction(e, deposit, 'add')} className="add-deposit">
        <AmountSetter amount={deposit} setAmount={setDeposit}></AmountSetter>
        <Button>Add Deposit</Button>
        </form>
      </Dialog>
      <Dialog open={collDepDialog} closeFunction={() => setCollDepDialog(false)}>
        <form onSubmit={e => depositFunction(e, collDeposit, 'collect', atBank)} className="collect-deposit">
        <AmountSetter amount={collDeposit} setAmount={setCollDeposit} max={player.deposit}></AmountSetter>
        <div className="submit">
          <div className="at-go">
            <input id="at-bank" type="checkbox" onChange={e => setAtBank(e.target.checked)} checked={atBank}></input>
            <label htmlFor="at-bank">I'm at Go</label>
          </div>
          <Button>Collect Deposit</Button>
        </div>
        </form>
      </Dialog>
    </div>
  )

}

export default Dashboard
