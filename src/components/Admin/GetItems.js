import React, { useState, useEffect } from 'react'
import Link from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { getItems } from '../../api/scan'
import { getUsersForAdmin } from '../../api/auth'
import { deleteItem, updateItem } from '../../api/scan'
import Button from 'react-bootstrap/Button'

const GetItems = ({ user, msgAlert }) => {
  const [items, setItems] = useState([])
  const [data, setData] = useState("")

useEffect(() => {
  getItems(user)
    .then(res => setItems(res.data.items))
}, [])


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
