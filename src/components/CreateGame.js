import React, { useState } from 'react'
import axios from 'axios'
import Auth from '../lib/auth'

import Game from './Game'

const CreateGame = props => {

  const [name, setName] = useState('')
  const [error, setError] = useState(null)

  const createGame = e => {
    e.preventDefault()
    let game = null
    axios.post('/api/games', { name: name.toLowerCase(), players: [Auth.getToken()], history: [] })
      .then(res => game = res.data)
      .then(res => axios.post('/api/players', { name: 'Bank-'+game.name, is_bank: true }))
      .then(res => {
        const bankId = res.data.id
        axios.patch('/api/games/'+game.id, {players: [...game.players, bankId]})
      })
      .then(() => props.history.push('/dashboard'))
      .catch(err => {
        console.log(err.response.data.name[0])
        setError(err.response.data.name[0])
      })
  }

  return (
    <Game
      title="Create Game"
      action={createGame}
      name={name}
      setName={setName}
      buttonText="Create"
      error={error}
      setError={setError}
    />
  )


}

export default CreateGame
