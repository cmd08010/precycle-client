import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { scanIndex, addItem } from '../../api/scan'
import { getUsersForAdmin, deactivateAUser } from '../../api/auth'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import Users from '../Admin/Users'
import AddMaterial from '../Materials/AddMaterial'
import Materials from '../Materials/Materials'
import AddItem from '../Admin/AddItem'
import GetItems from '../Admin/GetItems'

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
      <div className="admin-panel">
        <h1>Admin Panel</h1>
        <div className="links">
          <Link to="/admin/users" className="links">Users</Link>
          <Link to="/admin/add-item" className="links">Add Items</Link>
          <Link to="/admin/get-items" className="links">Get Items</Link>
          <Link to="/admin/add-material" className="links">Add Material</Link>
          <Link to="/admin/materials" className="links">Get Materials</Link>
          </div>
          <AuthenticatedRoute user={user} path='/admin/add-item' render={() => (
             <div>{user.is_superuser && <AddItem msgAlert={this.msgAlert} user={user} />}</div>
           )} />
           <AuthenticatedRoute user={user} path='/admin/get-items' render={() => (
              <div>{user.is_superuser && <GetItems msgAlert={this.msgAlert} user={user} />}</div>
            )} />
             <AuthenticatedRoute user={user} path='/admin/users' render={() => (
                <div>{user.is_superuser && <Users msgAlert={this.msgAlert} user={user} />}</div>
              )} />
             <AuthenticatedRoute user={user} path='/admin/add-material' render={() => (
                <div>{user.is_superuser && <AddMaterial msgAlert={this.msgAlert} user={user} />}</div>
              )} />
              <AuthenticatedRoute user={user} path='/admin/materials' render={() => (
                 <div>{user.is_superuser && <Materials msgAlert={this.msgAlert} user={user} />}</div>
               )} />
            <hr/>
            </div>
        </div>
    </div>
  )
}

export default withRouter(Admin)
