import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { scanItem, saveScan, scanItemWithApi } from '../../api/scan'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

import Form from 'react-bootstrap/Form'
import FormFile from 'react-bootstrap/FormFile'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Spinner from 'react-bootstrap/Spinner'
import Barcode from './Barcode'

const Scanner = ({ user, msgAlert }) => {
  const [response, setResponse] = useState(undefined)
  const [barcode, setBarcode] = useState('Not Found')
  const [api, setApi] = useState(false)
  const [formData, setFormData] = useState({})
  let numberOfApiCalls = 49
  const [form, setForm] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleInputChange = event => {
    event.persist()
    setFormData({ [event.target.name]: event.target.value })
  }

  const sendScanToApi = event => {
    event.preventDefault()
    if (!api) {
    scanItem(user, formData)
      .then(res => {
        console.log(res)
        setResponse(res.data.items)
      })
    } else {
      scanItemWithApi(user, formData)
        .then(res => {
          console.log(res)
            setResponse(res.data.item.products)
        })
    }
      // .then(() => msgAlert({
      //     heading: 'Scan Successfully Uploaded',
      //     message: 'Click to add more pictures to your account!',
      //     variant: 'success'
      //   }))
      // .catch(error => {
      //   msgAlert({
      //     heading: 'Failed to find scan ',
      //     message: 'Could not upload pictures with error' + error.message,
      //     variant: 'danger'
      //   })
      // })
    }

  const addImage = () => {}

  const postSavedScan = (event) => {
    saveScan(response)
    .then(res => console.log(res))

  }

  const showCorrectForm = (event) => {
    setForm(event.target.name)
  }

  const useApi = (event) => {
    numberOfApiCalls--
    setApi(!api)
  }


  return (
    <div className="container">
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
      <div className="bubble">
        <h2>Check your product!</h2>
        </div>
        <div className="form-buttons">
          <Button
            variant="link"
            type="button"
            name="barcode"
            className="bubble"
            onClick={showCorrectForm}
          >
          Barcode Scan
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
          <Button
            variant="link"
            type="button"
            name="barcode-number"
            className="bubble"
            onClick={showCorrectForm}
          >
          Barcode Number
          </Button>
        </div>

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
            <Form.Label>Type in your item name !</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              placeholder="Enter text"
              onChange={handleInputChange}
            />
          </Form.Group>}
          {form === "barcode-number" && <Form.Group controlId="text">
            <Form.Label>Type in your barcode number!</Form.Label>
            <Form.Control
              type="number"
              name="barcode"
              value={formData.barcode}
              placeholder="Enter Barcode Number"
              onChange={handleInputChange}
            />
          </Form.Group>}
          { form === "barcode" &&
          <Form.Group controlId="barcode">
          <Form.Label>Barcode</Form.Label>
            <Barcode
              barcode={barcode}
              setBarcode={setBarcode}
              formData={formData}
              setFormData={setFormData}
            />
          </Form.Group>
        }
        { form && <Button
          type="submit"
          className="bubble"
        >
        Submit
        </Button>}
        </Form>
        {user.is_superuser && <div><br/><br/>USE API?? {numberOfApiCalls} <BootstrapSwitchButton
        checked={api}
        onlabel='Api'
        offlabel='NO API'
        onChange={useApi}
        />
        </div>}
        {response && response.map(res => {
            return (<div key={response.indexOf(res)}>
                <h3>{res.barcode_number}</h3>
                <h3>{res.name}</h3>
                <h4>{res.description}</h4>
                {res.recycleable ? "YES RECYCLE IT!!!" : "NO NOT RECYCLEABLE"}
                <Button
                  type="submit"
                  className="bubble"
                  onClick={postSavedScan}
                >
                Save
                </Button>
                </div>
                )
            })}
            {response === [] && <div>no response</div>}
      </div>
    </div>
  </div>
  )
}

export default withRouter(Scanner)
