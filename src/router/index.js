import React from 'react'
import Main from '../components/main'
import SchedulersList from '../components/schedulers'
import RegistrationRooms from '../components/registrationRooms'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

export default function RouterProvider() {

  return (
    <>
      <Router>
        <Switch>
          <Route path="/" component={Main} exact />
          <Route path="/agenda" component={SchedulersList} exact />
          <Route path="/cadastrar" component={RegistrationRooms} exact />
        </Switch>
      </Router>
    </>
  )
}
