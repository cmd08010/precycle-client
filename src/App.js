import React, { Component, Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import Scanner from './components/Scanner/Scanner'
import Barcode from './components/Scanner/Barcode'
import AddItem from './components/Scanner/AddItem'
import GetItems from './components/Scanner/GetItems'
import Scans from './components/Scanner/Scans'
import Admin from './components/Admin/Admin'
import NotFound from './components/NotFound'
import ChangePassword from './components/ChangePassword/ChangePassword'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map(msgAlert => (
          <AutoDismissAlert
            key={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main className="container">
        <Switch>
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/home' render={() => (
            <Scanner msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/' render={() => (
            <Scanner msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/barcode' render={() => (
            <Barcode msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/get-scans' render={() => (
            <Scans msgAlert={this.msgAlert} user={user} />
          )} />
         <AuthenticatedRoute user={user} path='/add-item' render={() => (
            <div>{user.is_superuser && <AddItem msgAlert={this.msgAlert} user={user} />}</div>
          )} />
          <AuthenticatedRoute user={user} path='/get-items' render={() => (
             <div>{user.is_superuser && <GetItems msgAlert={this.msgAlert} user={user} />}</div>
           )} />
           <AuthenticatedRoute user={user} path='/users' render={() => (
              <div>{user.is_superuser && <Admin msgAlert={this.msgAlert} user={user} />}</div>
            )} />
            <Route path="*" component={NotFound} status={404} />
          </Switch>
        </main>
      </Fragment>
    )
  }
}

export default App
