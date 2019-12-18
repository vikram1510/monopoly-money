import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import Dialog from './Dialog'
import PlayerCard from './PlayerCard'
import AmountSetter from './AmountSetter'
import Button from '../common/Button'

const ReceiveButton = styled(Button)`
  background-color: #43C043;
`

const SendPayment = ({ others, fromPlayer, sendPaymentFunc }) => {

  const [dialog, setDialog] = useState(false)
  const [toPlayer, setToPlayer] = useState(null)
  const [amount, setAmount] = useState(0)

  useEffect(() => {
    if (toPlayer) {
      setDialog(true)
    } else setDialog(false)
  }, [toPlayer])

  const closeDialog = () => setToPlayer(null)

  const handleSubmit = (e, receive) => {
    e.preventDefault()
    if (receive) sendPaymentFunc(fromPlayer.id, toPlayer.id, amount)
    else sendPaymentFunc(toPlayer.id, fromPlayer.id, amount)
    setAmount(0)
    closeDialog()
  }

  return (
    <>
      {toPlayer &&
      <Dialog open={dialog} closeFunction={closeDialog}>
        <div className="payment-players">
          <PlayerCard player={fromPlayer}/>
          <i className="fas fa-chevron-right"></i>
          <PlayerCard player={toPlayer}/>
        </div>
        <form onSubmit={handleSubmit}>
          <AmountSetter amount={amount} setAmount={setAmount}></AmountSetter>
          <div className="payment-buttons" style={{ visibility: amount ? 'visible' : 'hidden' }}>
            <Button>SEND</Button>
            {toPlayer.is_bank && 
            <ReceiveButton onClick={e => handleSubmit(e, true)}>RECIEVE</ReceiveButton>
            }
          </div>
        </form>

      </Dialog>
      }
      <div className="send-payment">
        {others.map(player => (
          <PlayerCard 
            key={player.id} 
            player={player} 
            onClick={() => setToPlayer(player)} 
          />
        ))}
      </div>
    </>
  )
}

export default SendPayment
