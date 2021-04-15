import React, { useState } from 'react';
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { sendScan } from '../../api/scan'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function Barcode({ user, msgAlert, data, setData }) {
  const [ err, setErr ] = useState(null)
  const [ checked, setChecked ] = useState(false)
  const [ msg, setMsg ] = useState('')

  const beginBarcodeScan = () => {
    console.log(data)
    setChecked(true)
    setTimeout(() => {
      setChecked(false)
      if(data === 'Not Found') {
        setMsg("Please try again")
      }
    }, 3700)
  }

  console.log("in barcode component")

  return (
    <div>
    <BootstrapSwitchButton
    checked={checked}
    onlabel='Scan'
    offlabel='Stop'
    onChange={beginBarcodeScan}
    />

    { !checked && <div>
      <h3>{msg}</h3>
      </div>
    }
    { checked && <div>
      <BarcodeScannerComponent
      width={500}
      height={500}
      onUpdate={(err, result) => {
        if (result) {
          setData(result.text)
          setMsg("Hit submit to get a result!")
        }
        if (err) {
          setMsg("Error: ", err)
        }
      }}
      />
      </div>
    }
    { data && <p>Barcode: {data}</p>}
    </div>
  )
}

export default Barcode;
