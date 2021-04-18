import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { scanIndex, addItem } from '../../api/scan'
import { getMaterials } from '../../api/material'

import Form from 'react-bootstrap/Form'
import FormFile from 'react-bootstrap/FormFile'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Spinner from 'react-bootstrap/Spinner'
import { Col } from 'react-bootstrap'
import Barcode from '../Scanner/Barcode'

const AddItem = ({ user, msgAlert }) => {
  const [item, setItem] = useState({
    name: '',
    description: '',
    barcode: '',
    material: ''
  })
  const [materials, setMaterials] = useState([])
  const [recycleable, setRecycleable] = useState(false)

  useEffect(() => {
    getMaterials(user)
    .then(res => {
      console.dir(res.data.materials)
      setMaterials(res.data.materials)
    })
  },[])


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
