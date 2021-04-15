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
  const [name, setName] = useState('')
  const [recycleable, setRecycleable] = useState('')
  const [description, setDescription] = useState('')
  const [barcode, setBarcode] = useState('')
  const [data, setData] = useState('Not Found')

  const handleRecycleableChange = event => {
    setRecycleable(!recycleable)
  }
  const handleNameChange = event => {
    setName(event.target.value)
  }
  const handleDescriptionChange = event => {
    setDescription(event.target.value)
  }
  const handleBarcodeChange = event => {
    setBarcode(event.target.value)
  }

  const addNewItem = event => {
    event.preventDefault()
    const data = new FormData()
    data.append('name', name)
    data.append('recycleable', recycleable)
    data.append('description', description)
    data.append('barcode', barcode)
      addItem(user, data)
        .then(res => console.log(res))
        .then(() => msgAlert({
            heading: 'Picture Successfully Uploaded',
            message: 'Click to add more pictures to your account!',
            variant: 'success'
          }))
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
              value={name}
              placeholder="Enter name"
              onChange={handleNameChange}
            />
          </Form.Group>
          <Form.Group controlId="recycleable">
              <Form.Label>recycleable</Form.Label>
              <Form.Control
                type="checkbox"
                name="recycleable"
                onChange={handleRecycleableChange}
              />
            </Form.Group>
            <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={description}
                  placeholder="Enter Description"
                  onChange={handleDescriptionChange}
                />
              </Form.Group>
              <Form.Group controlId="barcode">
                  <Form.Label>Barcode</Form.Label>
                  <Form.Control
                    type="text"
                    name="barcode"
                    value={barcode}
                    placeholder="Enter Barcode"
                    onChange={handleBarcodeChange}
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
