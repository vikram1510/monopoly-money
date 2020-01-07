import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import Dialog from '../common/Dialog'
import PlayerCard from './PlayerCard'
import AmountSetter from './AmountSetter'
import Button from '../common/Button'
import PropertyList from './PropertyList'

const SEND_ACTION = 'SEND';
const RECIEVE_ACTION = 'RECIEVE';
const PROPERTIES_ACTION = 'PROPERTIES';


const ReceiveButton = styled(Button)`
  background-color: #43C043;
`

const PropertyListButton = styled(Button)`
  background-color: #751ad9;
`

const SendPayment = ({ others, fromPlayer, sendPaymentFunc }) => {

  const [dialog, setDialog] = useState(false)
  const [toPlayer, setToPlayer] = useState(null)
  const [amount, setAmount] = useState(0)

  const [showPropertyList, togglePropertyList] = useState(false)

  useEffect(() => {
    if (toPlayer) {
      setDialog(true)
    } else setDialog(false)
  }, [toPlayer])

  const handleSubmit = (e, action) => {
    e.preventDefault()
      
    switch (action) {
      case RECIEVE_ACTION: 
        sendPaymentFunc(fromPlayer.id, toPlayer.id, amount)
        break;
      case SEND_ACTION: 
        sendPaymentFunc(toPlayer.id, fromPlayer.id, amount)
        break;
      case PROPERTIES_ACTION:
        togglePropertyList(true)
        break;
      default:
        break;
    }

    setAmount(0)
    setDialog(false)
  }

  return (
    <>
      {showPropertyList && <PropertyList showPropertyList={showPropertyList}
                                        togglePropertyList={togglePropertyList}
                                        from={fromPlayer.id}
                                        to={toPlayer.id}
                                        sendPaymentFunc={sendPaymentFunc}/>}
      {toPlayer &&
      <Dialog open={dialog} closeFunction={() =>setDialog(false)}>
        <div className="payment-players">
          <PlayerCard player={fromPlayer} animateOnRender={false}/>
          <i className="fas fa-chevron-right"></i>
          <PlayerCard player={toPlayer} animateOnRender={false}/>
        </div>
        <form onSubmit={handleSubmit}>
          <AmountSetter amount={amount} setAmount={setAmount}></AmountSetter>
          <div className="payment-buttons">
            <Button onClick={(e => handleSubmit(e, SEND_ACTION))}>SEND</Button>
            {toPlayer.is_bank && 
            <>
            <ReceiveButton onClick={e => handleSubmit(e, RECIEVE_ACTION)}>RECIEVE</ReceiveButton>
            </> }
          </div>
          {toPlayer.is_bank && 
          <div className="properties-button">
            <PropertyListButton onClick={e => handleSubmit(e, PROPERTIES_ACTION)}>PROPERTIES</PropertyListButton>
          </div>
          }
        </form>
      </Dialog>
      }
      <div className="send-payment">
        {others
        .sort((a, b) => {
          if(a.name.startsWith('Bank')) {
            return 1
          }
          return a.name < b.name ? 1 : -1
        }).map(player => (
          <PlayerCard 
            key={player.id} 
            player={player} 
            onClick={() => setToPlayer(player)}
            animateOnRender={false} 
          />
        ))}
      </div>
    </>
  )
}

export default SendPayment
