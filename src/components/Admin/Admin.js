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
import UpdateItem from '../Admin/UpdateItem'
import GetItems from '../Admin/GetItems'

import { getMaterials } from '../../api/material'

import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'

const Admin = ({ user, msgAlert, barcode, setBarcode, location }) => {
  const [rerender, setRerender] = useState('')
  const [item, setItem] = useState({
    name: '',
    description: '',
    barcode: '',
    material: ''
  })
  const [materials, setMaterials] = useState([])
  const [recycleable, setRecycleable] = useState(false)


  useEffect(() => {
    console.log("in use effect")
    getMaterials(user)
      .then(res => {
        console.dir(res.data.materials)
        setMaterials(res.data.materials)
      })
      .then(() => msgAlert({
        heading: 'Admin Panel',
        message: 'Admins have access to a suite of tools. Admins can view all items in the database in addition to adding, deleting and updating items. Admins can also add materials, see all scans including delete scans, view all users and deactivate and activate user accounts.',
        variant: 'success'
      }))
  }, [rerender])



  return (
    <div className="container">
      <div className="row">
        <div className="admin-panel">
          <div className="header-1">Admin Panel</div>
          <div className="links-container">
            <Link to="/admin/users" className="links">Users</Link>
            <Link to="/admin/add-item" className="links">Add Items</Link>
            <Link to="/admin/get-items" className="links">Get Items</Link>
            <Link to="/admin/add-material" className="links">Add Material</Link>
            <Link to="/admin/materials" className="links">Get Materials</Link>
          </div>
          {user.email === "test@admin.com" && location.pathname === "/admin" && <div className="header-4">
            On our test admin account, you can utilize all the same features with a test database.
            </div>}
          {location.pathname === "/admin" && <div className="auth-forms">
            Admins have access to a suite of tools. Admins can view all items in the database in addition to adding, deleting and updating items. Admins can also add materials, see all scans including delete scans, view all users and deactivate and activate user accounts.
          </div>}
          <br></br>

          <AuthenticatedRoute user={user} barcode={barcode} setBarcode={setBarcode} path='/admin/add-item' render={() => (
            <div>{user.is_superuser && <AddItem msgAlert={msgAlert} user={user} barcode={barcode} setBarcode={setBarcode} />}</div>
          )} />
          <AuthenticatedRoute user={user} barcode={barcode} setBarcode={setBarcode} path='/admin/add-item-from-scan' render={() => (
            <div>{user.is_superuser && <AddItem msgAlert={msgAlert} user={user} barcode={barcode} setBarcode={setBarcode} />}</div>
          )} />
          <AuthenticatedRoute user={user} path='/admin/update-item/:id' render={() => (
            <div>{user.is_superuser && <UpdateItem msgAlert={msgAlert} user={user} materials={materials} />}</div>
          )} />
          <AuthenticatedRoute user={user} path='/admin/update-test-item/:id' render={() => (
            <div>{user.is_superuser && <UpdateItem msgAlert={msgAlert} user={user} materials={materials} />}</div>
          )} />
          <AuthenticatedRoute user={user} path='/admin/get-items' render={() => (
            <div>{user.is_superuser && <GetItems msgAlert={msgAlert} user={user} />}</div>
          )} />
          <AuthenticatedRoute user={user} path='/admin/users' render={() => (
            <div>{user.is_superuser && <Users msgAlert={msgAlert} user={user} />}</div>
          )} />
          <AuthenticatedRoute user={user} path='/admin/add-material' render={() => (
            <div>{user.is_superuser && <AddMaterial msgAlert={msgAlert} user={user} />}</div>
          )} />
          <AuthenticatedRoute user={user} path='/admin/materials' render={() => (
            <div>{user.is_superuser && <Materials msgAlert={msgAlert} user={user} />}</div>
          )} />
          <hr />
        </div>
      </div>
    </div>
  )
}

export default withRouter(Admin)
