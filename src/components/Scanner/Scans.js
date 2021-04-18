import React, { useState, useEffect } from 'react'
import Link from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { getScans, deleteScan } from '../../api/scan'
import { getUsersForAdmin } from '../../api/auth'

import Button from 'react-bootstrap/Button'
import moment from 'moment'
import Card from 'react-bootstrap/Card'

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
      <div className="col-sm-12 col-md-10 mx-auto mt-5">
        <div className="header-2">Get My Scans</div>
        <div className="cards">
        {myScans.map(scan => {
            return (
                <div key={scan.id}>
                <Card style={{ width: '18rem', height: 'auto' }}>
                  <Card.Body>
                    <Card.Title><div className="header-5">Created at: {moment(scan.created_at).format('MM/DD/YYYY')}</div></Card.Title>
                      <Card.Text>{scan.name}</Card.Text>
                      <Card.Text>Recyclable?: {scan.recycleable ? "yes" : "no"}</Card.Text>
                      <Card.Text>Description: {scan.description}</Card.Text>
                      <Card.Text>Barcode: {scan.barcode}</Card.Text>
                    <Button
                    type="submit"
                    variant="outline-secondary"
                    className="card-button"
                    onClick={()=> deleteThisScan(scan)}
                    >
                    Delete
                    </Button>
                  </Card.Body>
                </Card>
                  <hr />
                </div>
              )
            })}
            <br/>
            </div>
            {user.is_superuser && <div>
                <div className="header-2">All Scans</div>
                <div className="cards">
            {scans.map(scan => {
                return (
                    <div key={scan.id}>
                      <Card style={{ width: '18rem' }}>
                        <Card.Body>
                          <Card.Title><div className="header-5">Created at: {moment(scan.created_at).format('MM/DD/YYYY')}</div></Card.Title>
                            <Card.Text>{scan.name}</Card.Text>
                            <Card.Text>Owner: {scan.owner}</Card.Text>
                            <Card.Text>Recyclable?: {scan.recycleable ? "yes" : "no"}</Card.Text>
                            <Card.Text>Description: {scan.description}</Card.Text>
                            <Card.Text>Barcode: {scan.barcode}</Card.Text>
                          <Button
                          type="submit"
                          variant="outline-secondary"
                          className="card-button"
                          onClick={()=> deleteThisScan(scan)}
                          >
                          Delete
                          </Button>
                        </Card.Body>
                      </Card>
                      <hr />
                    </div>
                  )
                })}
                </div>
            </div>}
      </div>
    </div>
  </div>
  )
}

export default withRouter(Scans)
