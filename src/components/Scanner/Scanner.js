import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { scanIndex, sendScan } from '../../api/scan'

import Form from 'react-bootstrap/Form'
import FormFile from 'react-bootstrap/FormFile'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Spinner from 'react-bootstrap/Spinner'
import { Col } from 'react-bootstrap'
import Barcode from './Barcode'

const Scanner = ({ user, msgAlert }) => {
  const [caption, setCaption] = useState('')
  const [text, setText] = useState('')
  const [form, setForm] = useState(null)
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(null)
  const [barcode, setBarcode] = useState(null)
  const [data, setData] = useState('Not Found')

  useEffect(() => {
    scanIndex(user)
    .then(res => console.log(res))
  }, [])

  const handleTextChange = event => {
    setText(event.target.value)
  }

  const handleImageSubmit = event => {
    event.preventDefault()
    let data = ""
    if(form === "image"){
      data = image
    }
    if(form === "text"){
      console.log(text, "text")
      data = text
    }
    if(form === "barcode") {
      sendScan(user, data)
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
  }

  const addImage = () => {}

  const showBarcodeForm = () => {
    setForm("barcode")

  }
  const showTextForm = () => {
    setForm("text")
  }
  const showImageForm = () => {
    setForm("image")
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
          className="bubble"
          onClick={showBarcodeForm}
        >
        Barcode
        </Button>
        <Button
          variant="link"
          type="button"
          className="bubble"
          onClick={showTextForm}
        >
        Text
        </Button>
        <Button
          variant="link"
          type="button"
          className="bubble"
          onClick={showImageForm}
        >
        Image
        </Button>
        <Form onSubmit={handleImageSubmit}>
          {form === "image" &&<Form.Group controlId="image">
            <FormFile
              required
              id="upload-file-input"
              label="Upload File Here"
              onChange={addImage}
            />
          </Form.Group>}
          {form === "text" && <Form.Group controlId="caption">
            <Form.Label>Text</Form.Label>
            <Form.Control
              type="text"
              name="caption"
              value={text}
              placeholder="Enter Caption"
              onChange={handleTextChange}
            />
          </Form.Group>}
          { form === "barcode" &&
          <Form.Group controlId="caption">
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
      </div>
    </div>
  </div>
  )
}

export default withRouter(Scanner)
