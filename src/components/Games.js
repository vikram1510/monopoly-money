import React from 'react'
import axios from 'axios'

import Auth from '../lib/auth'

class Games extends React.Component{

  constructor(){
    super()
    this.state = {
      games: null
    }
  }

  componentDidMount(){
    axios.get('api/games')
      .then(res => this.setState({ games: res.data }))
      .catch(err => console.log(err.response.data))
  }

  joinGame(gameId){
    const playerId = Auth.getToken()
    axios.patch(`api/players/${playerId}`, { game: gameId })
      .then(() => {
        this.props.history.push('players/' + playerId)
      })
  }

  render(){
    if (!this.state.games) return null
    return (
      <>
      <div className="games-page">
        <h1>Games</h1>
        <div className="games">
          {this.state.games.map(game => (
            <div key={game.id} className="game">
              <h3>{game.name}</h3>
              <button onClick={() => this.joinGame(game.id)}>Join</button>
            </div>
          ))}
        </div>

      </div>
      </>

    )
  }
}

export default Games
