import React from 'react'
import styled from 'styled-components'

const PlayerCardStyle = styled.div`
  width: 60px;
  text-align: center;
  h4 {
    margin-top: 10px;
  }
  .player-photo {
    background-color: ${({cardColor}) => cardColor};
    height: 60px;
  }
`

const PlayerCard = ({ player, onClick = null }) => {

  return (
    <PlayerCardStyle onClick={onClick} cardColor={player.is_bank ? 'gold' : 'royalblue'}>
      <div className="player-photo"></div>
      <h4>{player.name.split('-')[0]}</h4>
    </PlayerCardStyle>
  )

}

export default PlayerCard
