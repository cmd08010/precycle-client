import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { getItems, getTestItems } from '../../api/scan'
import { deleteItem, deleteTestItem } from '../../api/scan'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { scanIndex, addItem } from '../../api/scan'
import { getMaterials } from '../../api/material'
import UpdateItem from './UpdateItem'

const GetItems = ({ user, msgAlert }) => {
  const [items, setItems] = useState([])
  const [testItems, setTestItems] = useState([])
  const [data, setData] = useState("")
  const [materials, setMaterials] = useState([])
  const [recycleable, setRecycleable] = useState(false)
  const [itema, setItema] = useState({
    name: '',
    description: '',
    barcode: '',
    material: ''
  })

  useEffect(() => {
    if (user.email === "test@admin.com") {
      getTestItems(user)
        .then(res => {
          setItems(res.data.items)
          setTestItems(res.data.test_items)
        })
        .then(() => {
          getMaterials(user)
            .then(res => {
              console.dir(res.data.materials)
              setMaterials(res.data.materials)
            })
        })

    } else {
      getItems(user)
        .then(res => setItems(res.data.items))
        .then(() => {
          getMaterials(user)
            .then(res => {
              console.dir(res.data.materials)
              setMaterials(res.data.materials)
            })
        })
    }
  }, [itema])

  const deleteTheItem = (item) => {
    if (user.email === "test@admin.com") {
      deleteTestItem(user, item.id)
        .then(res => setItema({
          name: '',
          description: '',
          barcode: '',
          material: ''
        }))

    } else {
      deleteItem(user, item.id)
        .then(res => setItema({
          name: '',
          description: '',
          barcode: '',
          material: ''
        }))
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <div className="admin-panel">
            <div className="header-2">Get Items</div>
            {testItems &&
              <div className="header-4">
                Try Updating and deleting the Test Items!
              {testItems.map(testItem => {
                return (
                  <div key={testItem.id} className={testItem.recycleable ? "recycleable" : "not-rec"}>

                    <div className="header-4">{testItem.name}</div>
                    <p>Owner: {testItem.owner}</p>
                    <p>Recyclable?: {testItem.recycleable ? "yes" : "no"}</p>
                    <p>Description: {testItem.description}</p>
                    <p>Barcode: {testItem.barcode}</p>
                    <Button
                      type="submit"
                      onClick={() => deleteTheItem(testItem)}
                    >
                      Delete
                    </Button>
                    <Link
                      className="btn btn-outline-light btn-lg"
                      role="button"
                      to={`/admin/update-test-item/${testItem.id}`}
                    >
                      Update
                    </Link>
                  </div>

                )
              })}
              </div>}
            <hr></hr>
            <div className="header-4">Here are the items in the current database</div>
            {items.map(item => {
              if (user.email === "test@admin.com") {
                return (
                  <div key={item.id} className={item.recycleable ? "recycleable" : "not-rec"}>
                    <div className="header-4">{item.name}</div>
                    <p>Owner: {item.owner}</p>
                    <p>Recyclable?: {item.recycleable ? "yes" : "no"}</p>
                    <p>Description: {item.description}</p>
                    <p>Barcode: {item.barcode}</p>
                  </div>
                )
              } else {
                return (
                  <div key={item.id} className={item.recycleable ? "recycleable" : "not-rec"}>
                    <div className="header-4">{item.name}</div>
                    <p>Owner: {item.owner}</p>
                    <p>Recyclable?: {item.recycleable ? "yes" : "no"}</p>
                    <p>Description: {item.description}</p>
                    <p>Barcode: {item.barcode}</p>
                    <Button
                      type="submit"
                      onClick={() => deleteTheItem(item)}
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
              }
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(GetItems)
