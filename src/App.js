import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './styles/style.scss'
import Login from './components/Login'
import Home from './components/Home'
import CreateGame from './components/CreateGame'
import joinGame from './components/joinGame'
import Dashboard from './components/Dashboard/Dashboard'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Login}/>
      <Route path='/home' component={Home}/>
      <Route path='/dashboard' component={Dashboard}/>
      <Route path='/create-game' component={CreateGame}/>
      <Route path='/join-game' component={joinGame}/>
    </Switch>
  </BrowserRouter>
)

export default App;
