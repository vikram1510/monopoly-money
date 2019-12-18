import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { Nav, NavOption } from './Nav'

import Auth from '../../lib/auth'
import SendPayment from './SendPayment'
import Leaderboard from './Leaderboard'
import PlayerCard from './PlayerCard'
import Button from '../common/Button'

const Dashboard = props => {

  const [player, setPlayer] = useState()
  const [navOption, setNavOption] = useState('payment')
  const [game, setGame] = useState()

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

  if (!game) return null
  return (
    <div className="container">
      <h1>Game: {game.name}</h1>
      <div className="dashboard">
        <div className="top">
          <PlayerCard player={player} />
          <h2>{player.amount}</h2>
          <Button onClick={getPlayer} bg="gray"><i className="fas fa-sync-alt"></i></Button>
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
    </div>
  )

}

export default Dashboard
