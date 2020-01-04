import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from './common/Button'
import styled from 'styled-components'

import PlayerCard from '../components/Dashboard/PlayerCard'
import api from '../api/api'
import Auth from '../lib/auth'

const HomeButton = styled(Button)`
  width: 80px;
`
const Home = ({ history }) => {

  const [player, setPlayer] = useState(null)

  const logOut = () => {
    Auth.logOut()
    history.push('/')
  }

  useEffect(() => {
    api.getPlayer(Auth.getToken())
      .then(player => setPlayer(player))
      .catch(err => console.log(err.response.data))
  }, [])

  if (!player) return null
  return (
    <div className="container">
      <div className="home-page">
        <div className="header">
          <PlayerCard player={player} showAmount={false} />
          <Button bg="indianred" onClick={logOut}>Log Out</Button>
        </div>

        <div className="buttons">
          <Link to="/join-game"><HomeButton bg="green">Join Game</HomeButton></Link>
          <Link to="/create-game"><HomeButton>Create Game</HomeButton></Link>
        </div>
      </div>
    </div>
  )


}


export default Home
