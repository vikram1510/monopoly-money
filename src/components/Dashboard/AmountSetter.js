import React, { useEffect } from 'react'
import styled from 'styled-components'

import Input from '../common/Input'

const AmountSetterStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  /* padding-top: 0px; */
  align-items: center;
  justify-content: space-between;

  .amount-buttons {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    text-align: center;
    
    label {
      padding: 10px;
      background-color: #F9DC5C;
      font-size: 15px;
      font-weight: 1000;
      color: rgba(0,0,0,0.5);
      border: 1px solid rgba(0,0,0,0.5);
      /* border: 2px solid transparent; */
      user-select: none;
    }

    label:active{
      border: 2px solid black;
    }

    label.amount-500{
      background-color: #ffb24d;
    }

    label.amount-100{
      background-color: #ffc375;
    }

    label.amount-50{
      background-color: #ca9ca9;
    }
    label.amount-20{
      background-color: #f7ffb2;
    }
    label.amount-10{
      background-color: #7ABACA;
    }

    label.amount-5{
      background-color: #ffc3c3;
    }

    label.amount-reset {
      grid-column: span 3;
      background-color: #ED254E;
      
    }
  }
`
const AmountSetter = ({ amount, setAmount, max = null }) => {

  const amounts = [500,100,50,20,10,5]

  const checkMax = newAmount => {
    if (max !== null && newAmount >= max) return max
    return newAmount
  }

  const changeAmount = (increaseBy, e) => {
    if (e) {
      const newAmount = checkMax(Number(e.target.value))
      setAmount(newAmount)
      return
    }
    if (increaseBy !== 'reset'){
      const newAmount = checkMax(amount + increaseBy)
      setAmount(newAmount)
    } else setAmount(0)
  }
  
  setAmount(checkMax(amount))

  return (
    <AmountSetterStyle>
      <Input
        value={amount}
        inputMode="numeric"
        onChange={e => changeAmount(null, e)}
      ></Input>
      <div className="amount-buttons">
        {amounts.map((amount,id) => (
          <label key={id} className={'amount amount-'+amount} onClick={() => changeAmount(amount)}>+{amount}</label>
        ))}
        <label className="amount-reset" onClick={() => changeAmount('reset')}>RESET</label>
      </div>
    </AmountSetterStyle>
  )

}

export default AmountSetter
