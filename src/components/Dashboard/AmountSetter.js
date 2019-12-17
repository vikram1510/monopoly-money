import React from 'react'
import styled from 'styled-components'

const AmountSetterStyle = styled.div`
  display: flex;
  padding: 20px;
  align-items: center;
  justify-content: space-between;
  input {
    width: 50px;
    height: 40px;
    text-align: center;
    background-color: transparent;
    border: 0;
    outline: none;
    border-bottom: 2px solid gray;
    font-size: 20px;
  }
  .amount-buttons {
    display: grid;
    grid-template-columns: repeat(3, 54px);
    grid-gap: 10px;
    text-align: center;
    
    label {
      padding: 10px;
      background-color: #F9DC5C;
      font-size: 12px;
      color: white;
      border: 2px solid transparent;
      user-select: none;
    }

    label:hover{
      border: 2px solid black;
    }

    label.amount-500{
      background-color: #AC96B7;
    }

    label.amount-100{
      background-color: #CA9CA9;
    }

    label.amount-50{
      background-color: #94AC96;
    }
    label.amount-20{
      background-color: #7ABACA;
    }
    label.amount-10{
      background-color: #AE977C;
    }

    label.amount-5{
      background-color: #CAAD50;
    }

    label.amount-reset {
      grid-column: span 3;
      background-color: #ED254E;
      color:white;
    }
  }
`
const AmountSetter = ({ amount, setAmount }) => {

  const amounts = [500,100,50,20,10,5]

  const changeAmount = (increaseBy, e) => {
    if (e) {
      setAmount(Number(e.target.value))
      return
    }
    if (increaseBy !== 'reset'){
      setAmount(amount + increaseBy)
    } else setAmount(0)
  }

  return (
    <AmountSetterStyle>
      <input
        value={amount}
        onChange={e => changeAmount(0, e)}
      ></input>
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
