import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { addMaterial } from '../../api/material'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const AddMaterial = ({ user, msgAlert }) => {
  const [name, setName] = useState('')
  const [recycleable, setRecycleable] = useState(false)

  const handleRecycleableChange = () => setRecycleable(!recycleable)

  const handleFormChange = event => {
    event.persist()
    setName(event.target.value)
  }

  const clearInput = () => {
    setName("")
  }

  const addNewMaterial = (event, form) => {
    event.preventDefault()
    const data = {name, recycleable}
      addMaterial(user, data)
        .then(res => clearInput())
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
        <div className="header-2">Add Material</div>
        </div>
        <Form onSubmit={addNewMaterial}>
        <Form.Group controlId="name">
            <Form.Label>Text</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={name}
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

export default withRouter(AddMaterial)
