import React from 'react'
import styled from 'styled-components'

const PlayerCardStyle = styled.div`
  width: 60px;
  text-align: center;
  h4 {
    margin-bottom: 10px;
  }
  .player-photo {
    background-color: royalblue;
    height: 60px;
  }
`

const PlayerCard = ({ name, onClick = null }) => {

  return (
    <PlayerCardStyle onClick={onClick}>
      <h4>{name}</h4>
      <div className="player-photo"></div>
    </PlayerCardStyle>
  )

}

export default PlayerCard
