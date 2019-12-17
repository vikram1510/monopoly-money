import React, { useState, useEffect } from 'react'

import Dialog from './Dialog'
import PlayerCard from './PlayerCard'
import AmountSetter from './AmountSetter'

const SendPayment = ({ others, fromPlayer, sendPaymentFunc }) => {

  const [dialog, setDialog] = useState(false)
  const [toPlayer, setToPlayer] = useState(null)
  const [amount, setAmount] = useState(0)

  useEffect(() => {
    if (toPlayer) {
      setDialog(true)
    } else setDialog(false)
  }, [toPlayer])

  const closeDialog = () => {
    setToPlayer(null)
  }

  return (
    <>
      {toPlayer &&
      <Dialog open={dialog} closeFunction={closeDialog}>
        <div className="payment-players">
          <PlayerCard name={fromPlayer.name}/>
          <i className="fas fa-chevron-right"></i>
          <PlayerCard name={toPlayer.name}/>
        </div>
        <AmountSetter amount={amount} setAmount={setAmount}></AmountSetter>
      </Dialog>
      }
      <div className="send-payment">
        {others.map(player => (
          <PlayerCard 
            key={player.id} 
            name={player.name} 
            onClick={() => setToPlayer(player)} 
          />
        ))}
      </div>
    </>
  )
}

export default SendPayment
