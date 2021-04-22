import React, { Component, Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import Home from './components/Header/Home'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import Scanner from './components/Scanner/Scanner'
import Barcode from './components/Scanner/Barcode'
import GetItems from './components/Admin/GetItems'

// admin
import Scans from './components/Scanner/Scans'
import Admin from './components/Admin/Admin'

import NotFound from './components/NotFound'
import ChangePassword from './components/ChangePassword/ChangePassword'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: [],
      barcode: ''
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  setBarcode = (code) => {
    this.setState({ barcode: code })
  }

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

  render() {
    const { msgAlerts, user, barcode } = this.state

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
            <Route exact path='/' user={user} render={() => (
              <Home msgAlert={this.msgAlert} user={user} />
            )} />
            <AuthenticatedRoute user={user} path='/sign-out' render={() => (
              <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
            )} />
            <AuthenticatedRoute user={user} path='/change-password' render={() => (
              <ChangePassword msgAlert={this.msgAlert} user={user} />
            )} />
            <AuthenticatedRoute user={user} path='/home' render={() => (
              <Home msgAlert={this.msgAlert} user={user} />
            )} />
            <AuthenticatedRoute user={user} barcode={barcode} setBarcode={this.setBarcode} exact path='/' render={() => (
              <Scanner msgAlert={this.msgAlert} user={user} barcode={barcode} setBarcode={this.setBarcode} />
            )} />
            <AuthenticatedRoute user={user} barcode={barcode} setBarcode={this.setBarcode} exact path='/scan' render={() => (
              <Scanner msgAlert={this.msgAlert} user={user} barcode={barcode} setBarcode={this.setBarcode} />
            )} />
            <AuthenticatedRoute user={user} barcode={barcode} setBarcode={this.setBarcode} path='/barcode' render={() => (
              <Barcode msgAlert={this.msgAlert} user={user} barcode={barcode} setBarcode={this.setBarcode} />
            )} />
            <AuthenticatedRoute user={user} path='/get-scans' render={() => (
              <Scans msgAlert={this.msgAlert} user={user} />
            )} />
            <AuthenticatedRoute user={user} path='/get-items' render={() => (
              <GetItems msgAlert={this.msgAlert} user={user} />
            )} />
            <AuthenticatedRoute user={user} barcode={barcode} setBarcode={this.setBarcode} path='/admin' render={() => (
              <div>{user.is_superuser && <Admin msgAlert={this.msgAlert} user={user} barcode={barcode} setBarcode={this.setBarcode} />}</div>
            )} />
          </Switch>
        </main>
      </Fragment>
    )
  }
}

export default App
