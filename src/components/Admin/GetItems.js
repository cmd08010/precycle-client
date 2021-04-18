import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { getItems } from '../../api/scan'
import { getUsersForAdmin } from '../../api/auth'
import { deleteItem, updateItem } from '../../api/scan'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { scanIndex, addItem } from '../../api/scan'
import { getMaterials } from '../../api/material'
import UpdateItem from './UpdateItem'

const GetItems = ({ user, msgAlert }) => {
  const [items, setItems] = useState([])
  const [data, setData] = useState("")
  const [materials, setMaterials] = useState([])
  const [recycleable, setRecycleable] = useState(false)
  const [item, setItem] = useState({
    name: '',
    description: '',
    barcode: '',
    material: ''
  })

useEffect(() => {
  getItems(user)
    .then(res => setItems(res.data.items))
    .then(() => {
    getMaterials(user)
    .then(res => {
      console.dir(res.data.materials)
      setMaterials(res.data.materials)
    })
  })
}, [])

const handleFormChange = event => {
  event.persist()
  if (event.target.name === "material") {
    const mat = materials.filter(material => material.name === event.target.value)
    console.log(mat[0].id, "mat")
    setRecycleable(mat[0].recycleable)
    setItem(prevItem => {
      const updatedField = { material: mat[0].id }
      const editedItem = Object.assign({}, prevItem, updatedField)
      return editedItem
  })
  } else {
    setItem(prevItem => {
      const updatedField = { [event.target.name]: event.target.value }
      const editedItem = Object.assign({}, prevItem, updatedField)
      return editedItem
    })
  }
}

  const deleteItem = (item) => {
    console.log(item)
    deleteItem(user, item.id)
    .then(res => console.log(res))
  }

  return (
    <div className="container">
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
      <div className="admin-panel">
        <div className="header-2">Get Items</div>
        {items.map(item => {
          return (
            <div key={item.id} className={item.recycleable ? "recycleable" : "not-rec"}>
            <div className="header-4">{item.name}</div>
            <p>Owner: {item.owner}</p>
            <p>Recyclable?: {item.recycleable ? "yes" : "no"}</p>
            <p>Description: {item.description}</p>
            <p>Barcode: {item.barcode}</p>
        <Button
          type="submit"
          onClick={() => deleteItem(item)}
        >
        Delete
    </Button>
    <Link
      className="btn btn-outline-light btn-lg"
      role="button"
      to={`/admin/update-item/${item.id}`}
      >
      Update
    </Link>
            </div>

          )
        })}
        </div>
      </div>
    </div>
  </div>
  )
}

export default withRouter(GetItems)
