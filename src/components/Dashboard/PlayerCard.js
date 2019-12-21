import React from 'react'
import styled from 'styled-components'
import CountUp from 'react-countup'

const PlayerCardStyle = styled.div`
  width: 60px;
  text-align: center;
  h4 {
    font-weight: bold;
    margin: 10px 0px 5px;
  }
  .player-photo {
    background-color: ${({cardColor}) => cardColor};
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      height: 100%;
      width: auto;
    }
  }
`

const PlayerCard = ({ player, onClick = null, showAmount = true }) => {

  return (
    <PlayerCardStyle onClick={onClick} cardColor={player.is_bank ? 'gold' : player.photo ? 'transparent' : 'royalblue'}>
      <div className="player-photo">
        {player.photo && <img src={player.photo} alt={player.name + ' photo'}></img>}
      </div>
      <h4>{player.name.split('-')[0]}</h4>
      {showAmount && !player.is_bank && <CountUp startOnMount={false} end={player.amount} prefix={'$'} duration={2} preserveValue={true}/>}
    </PlayerCardStyle>
  )

}

export default PlayerCard
