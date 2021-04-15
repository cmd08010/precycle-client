import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { scanIndex, addItem } from '../../api/scan'

import Form from 'react-bootstrap/Form'
import FormFile from 'react-bootstrap/FormFile'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Spinner from 'react-bootstrap/Spinner'
import { Col } from 'react-bootstrap'
import Barcode from './Barcode'

const AddItem = ({ user, msgAlert }) => {
  const [item, setItem] = useState({
    name: '',
    description: '',
    barcode: ''
  })
  const [recycleable, setRecycleable] = useState(false)

  const handleRecycleableChange = () => setRecycleable(!recycleable)

  const handleFormChange = event => {
    event.persist()
    setItem(prevItem => {
      const updatedField = { [event.target.name]: event.target.value }
      const editedItem = Object.assign({}, prevItem, updatedField)
      return editedItem
    })
  }

  const addNewItem = event => {
    event.preventDefault()
    const data = {...item, recycleable}
      addItem(user, data)
        .then(res => console.log(res))
        .catch(error => {
          msgAlert({
            heading: 'Failed to Upload Picture ',
            message: 'Could not upload pictures with error' + error.message,
            variant: 'danger'
          })
        })
    }

  return (
    <div className="container">
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
      <div className="bubble">
        <h2>Check your product!</h2>
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
          <Form.Group controlId="recycleable">
              <Form.Label>recycleable</Form.Label>
              <Form.Control
                type="checkbox"
                name="recycleable"
                value={recycleable}
                onChange={handleRecycleableChange}
              />
            </Form.Group>
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
              className="bubble"
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
