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
import CountUp from 'react-countup'
import Input from '../common/Input'

const Dashboard = props => {

  const [player, setPlayer] = useState()
  const [navOption, setNavOption] = useState('payment')
  const [game, setGame] = useState()

  const [addDepDialog, setAddDepDialog] = useState(false)
  const [deposit, setDeposit] = useState(0)

  const [profile, setProfile] = useState({photo: '', color: ''})

  const [collDepDialog, setCollDepDialog] = useState(false)
  const [collDeposit, setCollDeposit] = useState(0)
  const [atBank, setAtBank] = useState(true)

  const [addFpDialog, setAddFpDialog] = useState(false)
  const [fpAmount, setFpAmount] = useState(0)

  const [collFpDialog, setCollFpDialog] = useState(false)
  
  const [collSalDialog, setCollSalDialog] = useState(false)
  
  const [resetDialog, setResetDialog] = useState(false)

  const [profileDialog, setProfileDialog] = useState(false)

  const getPlayer = () => {
    const playerId = Auth.getToken()
    axios.get('/api/players/' + playerId).then(res => setPlayer(res.data))
      .catch(err => console.log('oh shit', err.response.data))
  }

  useEffect(getPlayer,[])

  useEffect(() => {
    if (player){
      axios.get('/api/games/' + player.game).then(res => setGame(res.data))
        .then(() => setProfile({photo: player.photo, color: player.color}))
        .catch(err => console.log('oh shit', err.response.data))
    }
  }, [player])

  const sendPayment = (to, from, amount) => {
    axios.post(`/api/games/${game.id}/payment`, { to, from, amount})
      .then(getPlayer)
      .catch(err => console.log(err.response.data))
  }

  const navSelect = e => setNavOption(e.target.value)

  const resetAmount = e => {
    e.preventDefault()
    axios.patch('/api/players/'+player.id, { amount: 1500, deposit: 0 })
      .then(() => axios.patch('/api/games/'+player.game, { free_parking: 0 }))
      .then(getPlayer)
      .then(() => setResetDialog(false))
      .catch(err => console.log('reset failed', err.response.data))
  }

  const depositFunction = (e, amount, action, atBank = null) => {
    e.preventDefault()

    const payload = { amount, action }
    if (atBank !== null) payload.at_bank = atBank
    axios.post('/api/players/'+player.id+'/deposit', payload).then(getPlayer)
      .then(() => setAddDepDialog(false))
      .then(() => setCollDepDialog(false))
      .then(() => setDeposit(0))
      .then(() => setCollDeposit(0))
      .catch(err => console.log('deposit failed', err.response.data))
  }

  const addFreeParking = (e, amount) => {
    e.preventDefault()
    axios.post('/api/games/'+player.game+'/freeparkingadd', {amount, player: player.id}).then(getPlayer)
    .then(() => setAddFpDialog(false))
    .then(() => setFpAmount(0))
    .catch(err => console.log('Free Parking Add failed', err.response.data))
  }

  const splitFreeParking = e => {
    e.preventDefault()
    axios.post('/api/games/'+player.game+'/freeparkingsplit', {player: player.id}).then(getPlayer)
    .then(() => setCollFpDialog(false))
    .catch(err => console.log('Free Parking Add failed', err.response.data))
  }

  const collectSalary = e => {
    e.preventDefault()
    const bankId = game.players.find(pl => pl.name.startsWith('Bank')).id
    const amount = 200 + parseInt(player.deposit*0.25)
    sendPayment(player.id, bankId, amount)
    setCollSalDialog(false)
  }

  const saveProfile = e => {
    e.preventDefault()
    axios.patch('/api/players/'+player.id, {photo: profile.photo})
    .then(getPlayer)
    .then(() => setProfileDialog(false))
    .catch(err => console.log(err.response.data))
  }

  if (!game) return null
  return (
    <div className="container">
      <div className="dashboard">
        <div className="top">
        <h1>{game.name.replace(/^\w/, c => c.toUpperCase())}</h1>
        <Button onClick={() => setResetDialog(true)}>RESET</Button>
        </div>
        <div className="info">
          <PlayerCard player={player} showAmount={false} onClick={() => setProfileDialog(true)} />
          {/* <h2>{player.amount}</h2> */}
          <CountUp startOnMount={false} end={player.amount} prefix={'$'} duration={2} preserveValue={true}/>
          <Button onClick={getPlayer}><i className="fas fa-sync-alt"></i></Button>
        </div>
        <div className="deposit-fp">
          <div>
            <label>Deposit</label>
            <CountUp startOnMount={false} end={player.deposit} prefix={'$'} duration={2} preserveValue={true}/>
            {/* <p>{player.deposit}</p> */}
          </div>
          <div>
            <label>Free Parking</label>
            <CountUp startOnMount={false} end={game.free_parking} prefix={'$'} duration={2} preserveValue={true}/>
            {/* <p>{game.free_parking}</p> */}
          </div>
        </div>
        <div className="action-buttons">
        <Button onClick={() => setCollSalDialog(true)}  className="collect-salary">Collect Salary</Button>
        <Button onClick={() => setAddDepDialog(true)} className="add-deposit">Add Deposit</Button>
        <Button onClick={() => setCollDepDialog(true)} className="collect-deposit">Withdraw Deposit</Button>
        <Button onClick={() => setAddFpDialog(true)}  className="add-fp">Add Free Parking</Button>
        <Button onClick={() => setCollFpDialog(true)}  className="collect-fp">Collect Free Parking</Button>
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
      <Dialog open={addFpDialog} closeFunction={() => setAddFpDialog(false)}>
        <form onSubmit={e => addFreeParking(e, fpAmount)} className="add-deposit">
        <AmountSetter amount={fpAmount} setAmount={setFpAmount}></AmountSetter>
        <Button>Add Free Parking</Button>
        </form>
      </Dialog>
      <Dialog open={collFpDialog} closeFunction={() => setCollFpDialog(false)}>
        <form onSubmit={splitFreeParking} className="yes-cancel">
          <div className="message">
            <p>Are you sure?</p>
            <p>You will receive {parseInt(game.free_parking/2)}</p>
          </div>
          <div className="buttons">
            <Button className="yes">Yes</Button>
            <Button className="cancel" onClick={() => setCollFpDialog(false)}>Cancel</Button>
          </div>
        </form>
      </Dialog>
      <Dialog open={collSalDialog} closeFunction={() => setCollSalDialog(false)}>
        <form onSubmit={collectSalary} className="yes-cancel">
          <div className="message">
            <p>You will receive {parseInt(200 + player.deposit*0.25)}</p>
          </div>
          <div className="buttons">
            <Button className="yes">Yes</Button>
            <Button className="cancel" onClick={() => setCollSalDialog(false)}>Cancel</Button>
          </div>
        </form>
      </Dialog>
      <Dialog open={resetDialog} closeFunction={() => setResetDialog(false)}>
        <form onSubmit={resetAmount} className="yes-cancel">
          <div className="message">
            <p>The game will be reset</p>
            <p>Are you sure?</p>
          </div>
          <div className="buttons">
            <Button className="yes">Yes</Button>
            <Button className="cancel" onClick={() => setResetDialog(false)}>Cancel</Button>
          </div>
        </form>
      </Dialog>
      <Dialog open={profileDialog} closeFunction={() => setProfileDialog(false)}>
        <form onSubmit={saveProfile} className="set-profile">
        <Input className="photo" placeholder="photo" value={profile.photo} onChange={(e) => setProfile({...profile, photo: e.target.value})}></Input>
        {/* <Input className="color" placeholder="color" value={profile.color} onChange={(e) => setProfile({...profile, color: e.target.value})}></Input> */}
        <Button>Submit</Button>
       </form>
      </Dialog>

    </div>
  )

}

export default Dashboard
