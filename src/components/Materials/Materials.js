import React, { useState, useEffect } from 'react'
import Link from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { getMaterials } from '../../api/material'

const Materials = ({ user, msgAlert }) => {
  const [materials, setMaterials] = useState([])

useEffect(() => {
  getMaterials(user)
    .then(res => {
      console.log(res)
      setMaterials(res.data.materials)
    })
}, [])


  return (
    <div className="container">
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
      <div className="bubble">
        <h2>Get Materials</h2>
        {materials.map(material => {
          return (
            <div className="admin" key={material.id}>
            <p>{material.name}</p>
            <p>Recyclable: {material.recycleable ? "YES" : "NO"}</p>
            </div>
          )
        })}

        </div>
      </div>
    </div>
  </div>
  )
}

export default withRouter(Materials)
