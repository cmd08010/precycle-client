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
  const [formData, setFormData] = useState({
    name: '',
    barcode: ''
  })
  const [numberOfApiCalls, setNumberOfApiCalls ] = useState(40)
  const [form, setForm] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleInputChange = event => {
    event.persist()
    setFormData({ [event.target.name]: event.target.value })
  }

  const sendScanToApi = event => {
    setLoading(true)
    setResponse(undefined)
    event.preventDefault()
    if (!api) {
      scanItem(user, formData)
      .then(res => {
        console.log(res.status, "my response")
        setLoading(false)
        setResponse(res.data.items)
        setMsg('')
        setFormData({
          name: '',
          barcode: ''
        })
      })
      .catch(err => {
        console.log(err, "err")
        setLoading(false)
        setMsg('Item Not found!')
      })
    } else {
      scanItemWithApi(user, formData)
      .then(res => {
        console.log(res)
        setLoading(false)
        setNumberOfApiCalls(prevNum => prevNum-1)
        setResponse(res.data.item.products)
      })
      .catch(err => {
        console.log(err, "err")
        setLoading(false)
        setMsg('Item Not found! -Add the item')
      })
    }
  }

  const postSavedScan = (event) => {
    console.log(response)
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
    setResponse('')
    setMsg('')
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
      onClick={showCorrectForm}
      >
      Barcode Scan
      </Button>
      <Button
      variant="link"
      type="button"
      name="text"
      onClick={showCorrectForm}
      >
      Item Name
      </Button>
      <Button
      variant="link"
      type="button"
      name="barcode-number"
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
      <Form.Group controlId="barcode" className="barcode">
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
      variant="outline-secondary"
      >
      Submit
      </Button>}
      </Form>
      </div>
      {user.is_superuser && <div className="admin-api">Use Api <BootstrapSwitchButton
      checked={api}
      onlabel='YES'
      offlabel='NO'
      onChange={useApi}
      className="api-button"
      />
      </div>}
      {loading && <Spinner animation="border"/>}
      {response && response.map(res => {
        return (<div className="response" key={response.indexOf(res)}>
        {res.recycleable ? <div><img src="/Recycle.jpeg" alt="yes" className="recycleable"/><p>{res.name} is Recycleable!</p></div> : <div><img src="/download.png"/><p>{res.name} is NOT recycleable.</p></div>}

        <h4>{res.name} is made out of {res.material}</h4>
        <Button
        type="submit"
        className="bubble"
        variant="outline-secondary"
        onClick={postSavedScan}
        >
        Save My Results!
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
