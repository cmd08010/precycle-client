import React, { useState, useEffect } from 'react'
import Link from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { getScans, deleteScan } from '../../api/scan'
import { getUsersForAdmin } from '../../api/auth'

import Button from 'react-bootstrap/Button'
import moment from 'moment'

const Scans = ({ user, msgAlert }) => {
  const [scans, setScans] = useState([])
  const [myScans, setMyScans] = useState([])
  const [rerender, setRerender] = useState("")

useEffect(() => {
  getScans(user)
    .then(res => {
      if(res.data['all-scans']){
        setScans(res.data['all-scans'])
      }
      setMyScans(res.data.scans)
    })
}, [rerender])

const deleteThisScan = (scan) => {
  deleteScan(user, scan)
  .then(res =>
    setRerender(Date.now()))
}


  return (
    <div className="container">
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
      <div className="bubble">
        <h2>Get My Scans</h2>
        {myScans.map(scan => {
            return (
                <div key={scan.id}>
                <h3>Name : {scan.name}</h3>
                <p>Owner: {scan.owner}</p>
                <p>Created at: {moment(scan.created_at).format('MM/DD/YYYY')}</p>
                <p>Recyclable?: {scan.recycleable ? "yes" : "no"}</p>
                <p>Description: {scan.description}</p>
                <p>Barcode: {scan.barcode}</p>
                <Button
                  type="submit"
                  className="bubble"
                  onClick={()=> deleteThisScan(scan)}
                  >
                  Delete
                </Button>
                </div>
              )
            })}
            <br/>
            {user.is_superuser && <div>
              <h2>All Scans</h2>
            {scans.map(scan => {
                return (
                    <div key={scan.id}>
                      <h3>Name : {scan.name}</h3>
                      <p>Owner: {scan.owner}</p>
                      <p>Recyclable?: {scan.recycleable ? "yes" : "no"}</p>
                      <p>Description: {scan.description}</p>
                      <p>Barcode: {scan.barcode}</p>
                      <Button
                        type="submit"
                        className="bubble"
                        onClick={()=> deleteThisScan(scan)}
                        >
                        Delete
                      </Button>
                    </div>
                  )
                })}
            </div>}
        </div>
      </div>
    </div>
  </div>
  )
}

export default withRouter(Scans)
