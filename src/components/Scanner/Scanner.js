import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { scanItem, addScan, scanItemWithApi } from '../../api/scan'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Barcode from './Barcode'

const Scanner = ({ user, msgAlert }) => {
  const [response, setResponse] = useState(undefined)
  const [barcode, setBarcode] = useState('Not Found')
  const [api, setApi] = useState(false)
  const [msg, setMsg] = useState('')
  const [formData, setFormData] = useState({})
  const [numberOfApiCalls, setNumberOfApiCalls ] = useState(40)
  const [form, setForm] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleInputChange = event => {
    event.persist()
    setFormData({ [event.target.name]: event.target.value })
  }

  const sendScanToApi = event => {
    setLoading(true)
    event.preventDefault()
    if (!api) {
      scanItem(user, formData)
      .then(res => {
        console.log(res.status, "my response")
        setLoading(false)
        setFormData({})
        setResponse(res.data.items)
      })
      .catch(err => {
        console.log(err, "err")
        setLoading(false)
        setMsg('Item Not found!')
      })
    } else {
      scanItemWithApi(user, formData)
      .then(res => {
        setLoading(false)
        setNumberOfApiCalls(prevNum => prevNum-1)
        setResponse(res.data.item.products)
      })
      .catch(err => {
        console.log(err, "err")
        setLoading(false)
        setMsg('Item Not found!')
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

  const postSavedScan = (event) => {
    addScan(user, response)
    .then(res => console.log(res))
    .then(() => msgAlert({
        heading: 'Scan Successfully Saved',
        message: 'Scan more items',
        variant: 'success'
      }))
    .catch(error => {
      msgAlert({
        heading: 'Failed to save scan',
        message: error.message,
        variant: 'danger'
      })
    })
  }


  const showCorrectForm = (event) => {
    setForm(event.target.name)
  }

  const useApi = (event) => {
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
      name="barcode-number"
      className="bubble"
      onClick={showCorrectForm}
      >
      Barcode Number
      </Button>
      </div>
      <div className="scanner-form">
      <Form onSubmit={sendScanToApi}>
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
      type="text"
      name="barcode"
      value={formData.barcode}
      placeholder="Enter Barcode Number"
      onChange={handleInputChange}
      />
      </Form.Group>}
      { form === "barcode" &&
      <Form.Group controlId="barcode">
      <Form.Label>Scan your barcode below</Form.Label>
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
      </div>
      {user.is_superuser && <div className="admin"><br/><br/>USE API?? {numberOfApiCalls} <BootstrapSwitchButton
      checked={api}
      onlabel='Api'
      offlabel='NO API'
      onChange={useApi}
      />
      </div>}
      {loading && <Spinner animation="border"/>}
      {response && response.map(res => {
        return (<div key={response.indexOf(res)}>
        <h3>{res.barcode_number}</h3>
        <h3>{res.name}</h3>
        <h4>{res.description}</h4>
        {res.recycleable ? <img src="https://static1.bigstockphoto.com/5/0/9/large1500/90589313.jpg" className="recycleable"/> : <img src="https://previews.123rf.com/images/kittichais/kittichais1511/kittichais151100074/47415154-no-sad-icon.jpg"/>}
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
    {msg && <div>{msg}</div>}
    </div>
    </div>
    </div>
  )
}

export default withRouter(Scanner)
