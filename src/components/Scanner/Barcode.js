import React, { useState } from 'react';
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

function Barcode() {

  const [ data, setData ] = useState('');
  const [ err, setErr ] = useState('')
  const [ show, setShow ] = useState(true)
  const [ checked, setChecked ] = useState(false)

  const beginBarcodeScan = () => {
    setChecked(true)
    setTimeout(() => {
      if(data != 'Not Found'){
        setChecked(false)
        setShow(false)
      } else {
        setChecked(false)
        setShow(false)
      }
    }, 3000)
  }

  const saveBarcode = () => {}

  console.log("in barcode component")
  return (
    <div>
    { !show && <div>
      <h3>Please try scanning again</h3>
      </div>}
      <BootstrapSwitchButton
      checked={checked}
      onlabel='Begin Scan'
      offlabel='Stop Scan'
      onChange={beginBarcodeScan}
      />
      { show && <div>
        <BarcodeScannerComponent
        width={500}
        height={500}
        onUpdate={(err, result) => {
          console.log(result, "the result")
          if (result) {
            setData(result.text)
            saveBarcode(data)
          }
          else if (err) {
            setErr(err)
          }
        }}
        />
        </div>
      }
      { data && <p>{data}</p>}
      </div>
    )
  }

  export default Barcode;
