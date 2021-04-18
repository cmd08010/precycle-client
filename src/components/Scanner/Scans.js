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
        <div className="header-2">Get My Scans</div>
        {myScans.map(scan => {
            return (
                <div key={scan.id}>
                <div className="header-4">Created at: {moment(scan.created_at).format('MM/DD/YYYY')}</div>
                <p>{scan.name}</p>
                <p>Owner: {scan.owner}</p>
                <p>Recyclable?: {scan.recycleable ? "yes" : "no"}</p>
                <p>Description: {scan.description}</p>
                <p>Barcode: {scan.barcode}</p>
                <Button
                  type="submit"
                  variant="outline-secondary"
                  onClick={()=> deleteThisScan(scan)}
                  >
                  Delete
                </Button>
                  <hr />
                </div>
              )
            })}
            <br/>
            {user.is_superuser && <div>
                <div className="header-2">All Scans</div>
            {scans.map(scan => {
                return (
                    <div key={scan.id}>
                    <div className="header-4">Created at: {moment(scan.created_at).format('MM/DD/YYYY')}</div>
                    <p>{scan.name}</p>
                      <p>Owner: {scan.owner}</p>
                      <p>Recyclable?: {scan.recycleable ? "yes" : "no"}</p>
                      <p>Description: {scan.description}</p>
                      <p>Barcode: {scan.barcode}</p>
                      <Button
                        type="submit"
                        variant="outline-secondary"
                        onClick={()=> deleteThisScan(scan)}
                        >
                        Delete
                      </Button>
                      <hr />
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
