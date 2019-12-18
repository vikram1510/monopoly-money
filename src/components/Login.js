import React from 'react'
import axios from 'axios'

import Auth from '../lib/auth'
import Button from './common/Button'
import Input from './common/Input'

class Home extends React.Component {
  constructor(){
    super()
    this.state = {
      name: '',
      error: ''
    }
  }
  
  componentDidMount(){
    axios.get('/api/games')
      .then(res => this.setState( { games: res.data }))
      .catch(err => console.log(err.response.data))
  }

  handleSubmit(e){
    e.preventDefault()
    const name = this.state.name.toLowerCase()
    axios.post('/api/players', { name })
      .then(res => {
        Auth.setToken(res.data.id)
        this.props.history.push('/home')
      })
      .catch(err => {
        console.log(err.response.data)
        const error = err.response.data['name'][0]
        if (error === 'player with this name already exists.') {
          axios.get(`/api/players?name=${name}`).then(res => {
            Auth.setToken(res.data[0].id)
            this.props.history.push('/home')
          }).catch(err => console.log('you really fucked up', err.response.data))
        } else this.setState({ error })
      })
  }

  render(){
    return (
      <div className="container">
        <form className="login" onSubmit={(e) => this.handleSubmit(e)}>
          <div className="text-input">
            <Input 
              name="name" 
              onChange={(e) => this.setState({ name: e.target.value, error: '' })}
              value={this.state.name}
              placeholder="Name"
            >
            </Input>
          </div>
          <Button>Enter</Button>
        {this.state.error && <p style={{ color: 'red' }}>{this.state.error}</p>}
        </form>
      </div>
    )
  }
}

export default Home
