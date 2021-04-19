import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const Home = ({ user, msgAlert }) => {
  const [items, setItems] = useState([])
  const [data, setData] = useState("")


  const deleteItem = (item) => {
    console.log(item)
    deleteItem(user, item.id)
    .then(res => console.log(res))
  }


  return (
    <div className="container">
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
      {!user &&
        <div className="home-page">
          <div className="header-3">Check out (p)recycle!</div>
          <div className="header-5">
            <Link to="/sign-in">Sign-in</Link> or <Link to="sign-up">Sign-up</Link> to get started!
          </div>
            <img src="Recycle.jpeg" />
          </div>
        }
        { user && <div className="home-page">
          <div className="home-page">
          <div className="header-4">Welcome, {user.email}</div>
          <div className="home-page-message">
          <img src="Recycle.jpeg" />
            <p>Precycle is an application that allows users to find out if items are recycleable or not. Check out our features by navigating to
            Scan an Item. You can scan the barcode with your camera, type in a keyword or name of an item, or enter the numerical Barcode
            to find out if your item is recycleable. The items are being updated constantly so keep checking back!</p>
          </div>
          </div>
          </div>
        }
    </div>
    </div>
  </div>
  )
}

export default withRouter(Home)
