import React, { useState } from 'react';
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { sendScan } from '../../api/scan'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function Barcode({ user, msgAlert, barcode, setBarcode, formData, setFormData}) {
  const [ err, setErr ] = useState(null)
  const [ checked, setChecked ] = useState(false)
  const [ msg, setMsg ] = useState('')

  const beginBarcodeScan = () => {
    console.log(barcode)
    setChecked(true)
    setTimeout(() => {

      setChecked(false)
      if(barcode === 'Not Found') {
        setMsg("Please try again")
      }
    }, 3700)
  }

  console.log("in barcode component")

  return (
    <div className="toggle">
    <BootstrapSwitchButton
    checked={checked}
    onlabel='Stop Scan'
    offlabel='Begin Scan'
    onChange={beginBarcodeScan}
    width={200} height={45}
    />

    { !checked && <div>
      <h3>{msg}</h3>
      </div>
    }
    { checked && <div className="barcode">
      <BarcodeScannerComponent
      width={500}
      height={500}
      onUpdate={(err, result) => {
        if (result) {
          console.log(result, "my scan result")
          setBarcode(result.text)
          setFormData({ barcode: result.text })
          setMsg("Hit submit to get a result!")
        }
        if (err) {
          setMsg("Error: ", err)
        }
      }}
      />
      </div>
    }
    { barcode !== 'Not Found' && <p> Barcode: {barcode}</p>}
    </div>
  )
}

export default Barcode;
