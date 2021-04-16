import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { scanIndex, addItem } from '../../api/scan'
import { getUsersForAdmin, deactivateAUser } from '../../api/auth'

import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'

const Admin = ({ user, msgAlert }) => {
  const [users, setUsers] = useState([])
  const [active, setActive] = useState(true)
  const [response, setResponse] = useState('')

useEffect(() => {
  console.log("in use effect")
  getUsersForAdmin(user)
    .then(res => setUsers(res.data.users))
}, [response])

const changeUserStatus = ( id) => {
  console.log(id,"my user")
  setActive(!user.is_active)
  deactivateAUser(user, id.user.id, active)
  .then(res => setResponse('done'))

}

  return (
    <div className="container">
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
      <div className="bubble">
        <h2>Check users</h2>
        {users.map(user => {
          return (
            <div key={user.id}>
            <p>{user.email}</p>
            <p>{user.id}</p>
            <p>Active?: {user.is_active ? "yes" : "no"}</p>
            <Button
              type="submit"
              variant="outline-secondary"
              className="bubble"
              onClick={() => changeUserStatus({user})}
            >
            {user.is_active ? "Deactivate" : "Activate"} user
            </Button>
            <hr/>
            </div>
          )
        })}
        </div>
      </div>
    </div>
  </div>
  )
}

export default withRouter(Admin)
