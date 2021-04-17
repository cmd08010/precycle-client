import React from 'react'
import { withRouter } from 'react-router-dom'

const NotFound = ({ user, msgAlert }) => {

  return (
    <div className="container">
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
      <div className="bubble">
        <h2>Item not found</h2>

        </div>
      </div>
    </div>
  </div>
  )
}

export default withRouter(NotFound)
