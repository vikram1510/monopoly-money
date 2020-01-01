import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from './common/Button'
import styled from 'styled-components'

import api from '../api/api'

const HomeButton = styled(Button)`
  width: 80px;
`

const Home = () => {

  // useEffect(() => {
  //   api.getPlayer()
  //     .then(player => console.log(player))
  //     .catch(err => console.log(err.response.data))
  // }, [])

  return (
    <div className="container">
      <div className="home-page">
        <Link to="/join-game"><HomeButton bg="green">Join Game</HomeButton></Link>
        <Link to="/create-game"><HomeButton>Create Game</HomeButton></Link>
      </div>
    </div>
  )


}


export default Home
