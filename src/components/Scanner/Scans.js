import React, { useState, useEffect } from 'react'
import Link from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { getScans, deleteScan } from '../../api/scan'
import { getUsersForAdmin } from '../../api/auth'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import moment from 'moment'
import Card from 'react-bootstrap/Card'

const Scans = ({ user, msgAlert }) => {
  const [scans, setScans] = useState([])
  const [scan, setScan] = useState({})
  const [myScans, setMyScans] = useState([])
  const [rerender, setRerender] = useState("")
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getScans(user)
      .then(res => {
        if (res.data['all-scans']) {
          setScans(res.data['all-scans'])
        }
        setMyScans(res.data.scans)
      })
  }, [rerender])

  const deleteThisScan = (scan) => {
    deleteScan(user, scan)
      .then(res => {
        setShow(false)
        setRerender(Date.now())
      })
  }

  const showModal = (scan) => {
    setShow(true)
    setScan(scan)
  }


  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-md-10 mx-auto mt-5">
          <div className="header-2">Get My Scans</div>
          <div className="header-5">See all the scans you have saved! You can delete any scans by clicking on the delete button</div>
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
                        onClick={() => showModal(scan)}
                      >
                        Delete
                    </Button>
                    </Card.Body>
                  </Card>
                  <hr />
                </div>
              )
            })}
            <br />
          </div>
          {user.is_superuser && user.email !== "test@admin.com" && <div>
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
                          onClick={() => showModal(scan)}
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
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Scan</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this scan?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
                </Button>
              <Button variant="primary" onClick={() => deleteThisScan(scan)}>
                Delete
                </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Scans)
