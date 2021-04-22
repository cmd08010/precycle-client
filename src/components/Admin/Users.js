import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { scanIndex, addItem } from '../../api/scan'
import { getUsersForAdmin, deactivateAUser } from '../../api/auth'

import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'

const Users = ({ user, msgAlert }) => {
  const [users, setUsers] = useState([])
  const [active, setActive] = useState()
  const [rerender, setRerender] = useState('')

  useEffect(() => {
    getUsersForAdmin(user)
      .then(res => setUsers(res.data.users))
  }, [rerender])

  const changeUserStatus = (id) => {
    setActive(id.is_active)
    if (user.email === "test@admin.com") {
      setActive(!active)
      setRerender(Date.now() + id.id)
    } else {
      setActive(!active)
      deactivateAUser(user, id.id, active)
        .then(res => {
          setUsers(res.data.users)
          setRerender(Date.now() + id.id)
        })
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <div className="admin-panel">
            <div className="header-2">Check users</div>
            {user.email === "test@admin.com" && <div>
              <div key={user.id} className={user.is_superuser ? "admin" : "user"}>
                <p>Email: {user.email}</p>
                <p>id: {user.id}</p>
                <p>Role: {user.role ? "admin" : "user"} </p>
                <p>Active?: {user.is_active ? "yes" : "no"}</p>
                <hr />
              </div>
              <div key="123" className={user.is_superuser ? "admin" : "user"}>
                Activate and Deactivate our test User:
                <p>Email: user@gmail.com</p>
                <p>id: 12</p>
                <p>Role: user</p>
                <p>Active?: {active ? "yes" : "no"}</p>
                <Button
                  type="submit"
                  variant="outline-secondary"
                  onClick={() => changeUserStatus(user)}
                >
                  {active ? "Deactivate " : "Activate "} User
              </Button>
                <hr />
              </div>
            </div>}
            {user.email !== "test@admin.com" && <div>
              {users.map(aUser => {
                return (
                  <div key={aUser.id} className={aUser.is_superuser ? "admin" : "user"}>
                    <p>Email: {aUser.email}</p>
                    <p>id: {aUser.id}</p>
                    <p>Role: {aUser.is_superuser ? "admin" : "user"} </p>
                    <p>Active?: {aUser.is_active ? "yes" : "no"}</p>
                    { aUser.email !== user.email && <Button
                      type="submit"
                      variant="outline-secondary"
                      onClick={() => changeUserStatus(aUser)}
                    >
                      {aUser.is_active ? "Deactivate " : "Activate "} User
              </Button>}
                    <hr />
                  </div>
                )
              })
              }
            </div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Users)
