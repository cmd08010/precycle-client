import React, { useState, useEffect } from 'react'
import Link from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { scanIndex, addItem } from '../../api/scan'
import { getUsersForAdmin } from '../../api/auth'


import Form from 'react-bootstrap/Form'
import FormFile from 'react-bootstrap/FormFile'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Spinner from 'react-bootstrap/Spinner'
import { Col } from 'react-bootstrap'
import Barcode from './Barcode'

const Admin = ({ user, msgAlert }) => {
  const [users, setUsers] = useState([])

useEffect(() => {
  getUsersForAdmin(user)
    .then(res => setUsers([res.data]))
}, [])


  return (
    <div className="container">
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
      <div className="bubble">
        <h2>Check users</h2>
        {users.map(user => {
          return (
            <Link path='/users/:id'> <p>user.email</p></Link>
          )
        })}
        </div>
      </div>
    </div>
  </div>
  )
}

export default withRouter(Admin)
