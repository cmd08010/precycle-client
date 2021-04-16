import React, { useState, useEffect } from 'react'
import Link from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { getScans } from '../../api/scan'
import { getUsersForAdmin } from '../../api/auth'

const Scans = ({ user, msgAlert }) => {
  const [scans, setScans] = useState([])
  const [myScans, setMyScans] = useState([])

useEffect(() => {
  getScans(user)
    .then(res => {
      if(res.data['all-scans']){
        setScans(res.data['all-scans'])
      }
      setMyScans(res.data.scans)
    })
}, [])


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
                <p>Recyclable?: {scan.recycleable ? "yes" : "no"}</p>
                <p>Description: {scan.description}</p>
                <p>Barcode: {scan.barcode}</p>
                </div>
              )
            })}
            <br/>
            {user.is_superuser && <div>
              <h2>All Scans</h2>
            {scans.map(scan => {
                return (
                    <div key={scan.id}>
                    <p>Owner: {scan.owner}</p>
                    <h3>Name : {scan.name}</h3>
                    <p>Recyclable?: {scan.recycleable ? "yes" : "no"}</p>
                    <p>Description: {scan.description}</p>
                    <p>Barcode: {scan.barcode}</p>
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
