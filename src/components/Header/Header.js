import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#get-scans">Get All Scans</Nav.Link>
    <Nav.Link href="#change-password">Change Password</Nav.Link>
    <Nav.Link href="#sign-out">Sign Out</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

const superUserOptions = (
  <Fragment>
    <Nav.Link href="#users">Users</Nav.Link>
    <Nav.Link href="#add-item">Add Items</Nav.Link>
    <Nav.Link href="#get-items">Get Items</Nav.Link>
    <Nav.Link href="#add-material">Add Material</Nav.Link>
    <Nav.Link href="#materials">Get Materials</Nav.Link>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <Nav.Link href="#home">Home</Nav.Link>
  </Fragment>
)

const Header = ({ user }) => {
  if (user) {
    if (user.is_superuser) {
      return (
      <Navbar variant="dark" expand="md" className="navbar">
        <Navbar.Brand href="#" className="navbar">
          (p)recycle
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            { user && <span className="navbar-text mr-2">Welcome, {user.email}, You are an admin.</span>}
            <hr/>
            Admin Options:
            { superUserOptions }
            <hr/>
            { alwaysOptions }
            { authenticatedOptions }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
    }
  }
  return (
  <Navbar variant="dark" expand="md" className="navbar">
    <Navbar.Brand href="#" className="navbar">
      (p)recycle
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
        { alwaysOptions }
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)
}
export default Header
