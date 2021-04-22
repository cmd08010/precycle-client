import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { scanIndex, addItem, addTestItem } from '../../api/scan'
import { getMaterials } from '../../api/material'

import Form from 'react-bootstrap/Form'
import FormFile from 'react-bootstrap/FormFile'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Spinner from 'react-bootstrap/Spinner'
import { Col } from 'react-bootstrap'
import Barcode from '../Scanner/Barcode'

const AddItem = ({ user, msgAlert, barcode, setBarcode, props, location }) => {

  const [item, setItem] = useState({
    name: '',
    description: '',
    barcode: barcode,
    material: ''
  })
  const [materials, setMaterials] = useState([])
  const [recycleable, setRecycleable] = useState(false)

  useEffect(() => {
    if (location.pathname !== "/admin/add-item-from-scan") {
      setBarcode('')
      setItem({
        name: '',
        description: '',
        barcode: '',
        material: ''
      })
    }
    getMaterials(user)
      .then(res => {
        console.dir(res.data.materials)
        setMaterials(res.data.materials)
      })
  }, [location.pathname])


  const handleFormChange = event => {
    event.persist()
    if (event.target.name === "material") {
      const mat = materials.filter(material => material.name === event.target.value)
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

  const addNewItem = event => {
    event.preventDefault()
    const data = { ...item, recycleable }
    if (user.email === "test@admin.com") {
      addTestItem(user, data)
        .then(res => console.log(res))
        .then(() => msgAlert({
          heading: 'Add Item Success',
          message: 'Added New Item',
          variant: 'success'
        }))
        .catch(error => {
          msgAlert({
            heading: 'Failed to add item: ' + error.message,
            message: 'Couldnt add item',
            variant: 'danger'
          })
        })

    } else {
      addItem(user, data)
        .then(res => console.log(res))
        .then(() => msgAlert({
          heading: 'Add Item Success',
          message: 'Added New Item',
          variant: 'success'
        }))
        .catch(error => {
          msgAlert({
            heading: 'Failed to add item: ' + error.message,
            message: 'Couldnt add item',
            variant: 'danger'
          })
        })
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <div className="bubble">
            <div className="header-5">Add a new Item to our Test Admin Database!</div>
          </div>
          <Form onSubmit={addNewItem}>
            <Form.Group controlId="name">
              <Form.Label>Text</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={item.name}
                placeholder="Enter name"
                onChange={handleFormChange}
              />
            </Form.Group>
            {// <Form.Group controlId="recycleable">
              //     <Form.Label>recycleable</Form.Label>
              //     <Form.Control
              //       type="checkbox"
              //       name="recycleable"
              //       value={recycleable}
              //       onChange={handleRecycleableChange}
              //     />
              //   </Form.Group>
            }
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={item.description}
                placeholder="Enter Description"
                onChange={handleFormChange}
              />
            </Form.Group>
            {materials && <Form.Group controlId="material">
              <Form.Label>Material</Form.Label>
              <Form.Control
                as="select"
                name="material"
                custom
                onChange={handleFormChange}
              >
                <option> </option>
                {materials.map(material => {
                  return (
                    <option key={material.id}>{material.name}</option>
                  )
                })}
              </Form.Control>
            </Form.Group>}
            <Form.Group controlId="barcode">
              <Form.Label>Barcode</Form.Label>
              <Form.Control
                type="text"
                name="barcode"
                value={item.barcode}
                placeholder="Enter Barcode"
                onChange={handleFormChange}
              />
            </Form.Group>
            <Button
              type="submit"
            >
              Submit
        </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default withRouter(AddItem)
