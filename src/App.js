import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './styles/style.scss'
import Login from './components/Login'
import Games from './components/Games'
import Dashboard from './components/Dashboard/Dashboard'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Login}/>
      <Route path='/games' component={Games}/>
      <Route path='/dashboard' component={Dashboard}/>
    </Switch>
  </BrowserRouter>
)

export default App;
