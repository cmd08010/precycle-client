import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { scanItem, saveScan } from '../../api/scan'

import Form from 'react-bootstrap/Form'
import FormFile from 'react-bootstrap/FormFile'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Spinner from 'react-bootstrap/Spinner'
import Barcode from './Barcode'

const Scanner = ({ user, msgAlert }) => {
  const [response, setResponse] = useState([])
  const [data, setData] = useState('Not Found')
  const [formData, setFormData] = useState({
      name: '',
      barcode: data
  })
  const [form, setForm] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleInputChange = event => {
    event.persist()
    setFormData(prevItem => {
      const updatedField = { [event.target.name]: event.target.value }
      const editedItem = Object.assign({}, prevItem, updatedField)
      return editedItem
    })
  }

  const sendScanToApi = event => {
    event.preventDefault()
    scanItem(user, formData)
      .then(res => setResponse(res.data.items))
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

  const addImage = () => {}

  const postSavedScan = (event) => {
    saveScan(response)
    .then(res => console.log(res))

  }

  const showCorrectForm = (event) => {
    setForm(event.target.name)
    setData("Not Found")
  }


  return (
    <div className="container">
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
      <div className="bubble">
        <h2>Check your product!</h2>
        </div>
        <Button
          variant="link"
          type="button"
          name="barcode"
          className="bubble"
          onClick={showCorrectForm}
        >
        Barcode
        </Button>
        <Button
          variant="link"
          type="button"
          name="text"
          className="bubble"
          onClick={showCorrectForm}
        >
        text
        </Button>
        <Button
          variant="link"
          type="button"
          name="image"
          className="bubble"
          onClick={showCorrectForm}
        >
        Image
        </Button>
        <Form onSubmit={sendScanToApi}>
          {form === "image" &&<Form.Group controlId="image">
            <FormFile
              required
              id="upload-file-input"
              label="Upload File Here"
              name="barcode-image"
              onChange={addImage}
            />
          </Form.Group>}
          {form === "text" && <Form.Group controlId="text">
            <Form.Label>Type in your item name or the barcode number!</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              placeholder="Enter text"
              onChange={handleInputChange}
            />
          </Form.Group>}
          { form === "barcode" &&
          <Form.Group controlId="barcode">
          <Form.Label>Barcode</Form.Label>
            <Barcode data={data} setData={setData} />
          </Form.Group>
        }
        { form && <Button
          type="submit"
          className="bubble"
        >
        Submit
        </Button>}
        </Form>
        {response && response.map(res => {
          return (<div key={res.id}>
            <h3>{res.name}</h3>
            {res.recycleable ? "YES RECYCLE IT!!!" : "NO NOT RECYCLEABLE"}
            <Button
              type="submit"
              className="bubble"
              onClick={postSavedScan}
            >
            Save
            </Button>
            </div>)
        })}
      </div>
    </div>
  </div>
  )
}

export default withRouter(Scanner)
