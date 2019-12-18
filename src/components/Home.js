import React from 'react'
import { Link } from 'react-router-dom'
import Button from './common/Button'
import styled from 'styled-components'

const HomeButton = styled(Button)`
  width: 80px;
`

const Home = () => {

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
