import React from 'react'
import styled from 'styled-components'

import Button from './common/Button'
import Input from './common/Input'

const Game = (props) => {

  return (
    <div className="container">
      <div className="game">
        <h1>{props.title}</h1>
        <form className="create-game" onSubmit={props.action}>
          <Input
            value={props.name}
            onChange={e => {
              props.setError('')
              props.setName(e.target.value)
            }}
            placeholder="Game Name"
            style={{ width: '150px' }}
          ></Input>
          <Button bg={props.bg ? props.bg : null}>{props.buttonText}</Button>
          <p style={{ color: 'red', visibility: props.error ? 'visible': 'hidden'}}>{props.error}</p>
        </form>
      </div>
    </div>
  )
}

export default Game
