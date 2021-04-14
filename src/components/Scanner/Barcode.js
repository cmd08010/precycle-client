import React, { useState } from 'react';
import BarcodeScannerComponent from "react-webcam-barcode-scanner";

function Barcode() {

  const [ data, setData ] = useState('');

  console.log("in barcode component")
  return (
    <div>
      <BarcodeScannerComponent
        width={500}
        height={500}
        onUpdate={(err, result) => {
          if (result) setData(result.text)
          else setData('Not Found')
        }}
      />
      <p>{data}</p>
    </div>
  )
}

export default Barcode;



// import React, { useState } from 'react';
// import BarcodeScannerComponent from "react-webcam-barcode-scanner";
// import PropTypes from 'prop-types';
// import './react-webcam.css';
//
// const Barcode = ({ user }) => {
//
//   const [ data, setData ] = useState('Not Found');
//
//   return (
//         <div id='videoview' width={this.props.width} height={this.props.height}>
//           <button onClick={scanBarcode}>Scan Barcodes</button>
//           <video
//             autoPlay
//             width={this.props.width}
//             height={this.props.height}
//             src={this.state.src}
//             muted={this.props.audio}
//             className={this.props.className}
//             playsInline
//             style={style}
//             ref={(ref) => {
//               this.video = ref;
//             }}
//           />
//           <canvas id="overlay" width={this.props.width} height={this.props.height}></canvas>
//         </div>
//       )
// export default Barcode;
