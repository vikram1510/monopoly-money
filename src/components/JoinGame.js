import React, { useState } from 'react'
import axios from 'axios'
import Auth from '../lib/auth'

import Game from './Game'

const JoinGame = props => {

  const [name, setName] = useState('')
  const [error, setError] = useState(null)

  const joinGame = e => {
    e.preventDefault()
    axios.get('/api/games?name='+name.toLowerCase())
      .then(res => {
        const game = res.data[0]
        return axios.patch('/api/players/'+Auth.getToken(), {game: game.id})
      })
      .then(() => props.history.push('/dashboard'))
      .catch(err => setError(err.response.data.name[0]))
  }

  return (
    <Game
      title="Join Game"
      action={joinGame}
      name={name}
      setName={setName}
      bg="green"
      buttonText="Join"
      error={error}
      setError={setError}
    />
  )
}

export default JoinGame
