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
  const [rerender, setRerender] = useState('')

useEffect(() => {
  console.log("in use effect")
  getUsersForAdmin(user)
    .then(res => setUsers(res.data.users))
}, [rerender])

const changeUserStatus = (id) => {
  console.log(id,"my user")
  setActive(!user.is_active)
  deactivateAUser(user, id.aUser.id, active)
  .then(res => setRerender(Date.now()+user.id))

}

  return (
    <div className="container">
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
      <div className="bubble">
        <h2>Check users</h2>
        {users.map(aUser => {
          return (
            <div key={aUser.id} className={aUser.is_superuser ? "admin" : "user"}>
            <p>Email: {aUser.email}</p>
            <p>id: {aUser.id}</p>
            <p>Role: {aUser.is_superuser ? "admin" : "user"} </p>
            <p>Active?: {aUser.is_active ? "yes" : "no"}</p>
            <Button
              type="submit"
              variant="outline-secondary"
              className="bubble"
              onClick={() => changeUserStatus({aUser})}
            >
            {aUser.is_active ? "Deactivate" : "Activate"} User
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
