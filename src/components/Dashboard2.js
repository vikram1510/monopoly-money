import React, { useEffect, useState } from 'react'
import axios from 'axios'

import SendPayment from './Dashboard/SendPayment'

const Dashboard = (props) => {

  const amounts = [500,100,50,20,10,5]
  const [player, setPlayer] = useState()
  const [others, setOthers] = useState([])
  const [game, setGame] = useState()
  const [payment, setPayment] = useState({ to: null, amount: 0 })

  const getPlayer = () => {
    const playerId = props.match.params.id
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

  useEffect(() => {
    if (player) {
      axios.get('/api/players?game=' + player.game).then(res => setOthers(res.data))
        .catch(err => console.log('oh shit', err.response.data))
    }
  }, [player])
  
  const sendPayment = e => {
    e.preventDefault()
    axios.post(`/api/games/${game.id}/payment`, { 
      to: payment.to.id, from: player.id, amount: payment.amount 
    })
      .then(() => setPayment({ to: null, amount: 0 }))
      .then(getPlayer)
      .catch(err => console.log(err.response.data))
  }

  const selectPlayer = e => {
    const to = others.find(pl => pl.id === Number(e.target.value))
    setPayment({ ...payment, to })
  }

  const changeAmount = increaseBy => {
    if (increaseBy !== 'reset'){
      setPayment({ ...payment, amount: payment.amount + increaseBy })
    } else setPayment({ ...payment, amount: 0 })
  }

  if (!player) return null
  return (
    <>
    <div className="dashboard-header">
      <h1>Hello {player && player.name}</h1>
      <h2>{player.amount}</h2>
      <button onClick={getPlayer}>REFRESH</button>
    </div>
    <SendPayment></SendPayment>
    <form onSubmit={sendPayment}>
      {others.filter(pl => pl.id !== player.id).map(pl => (
        <div key={pl.id} className="player-option">
          <label>{pl.name}</label>
          <input type="radio" name="to" checked={payment.to === pl} value={pl.id} onChange={selectPlayer}></input>
        </div>
      ))}
      {amounts.map((amount,id) => (
        <label key={id} className="amount" onClick={() => changeAmount(amount)}>+{amount}</label>
      ))}
      <label className="reset" onClick={() => changeAmount('reset')}>RESET</label>
      <div className="payment">
        <div className="payment-to">
          {payment.to && <h3>{payment.to.name}</h3>}
          <p>{payment.amount}</p>
        </div>
      </div>
      <button>SEND</button>
    </form>
    </>

  )

}


export default Dashboard



