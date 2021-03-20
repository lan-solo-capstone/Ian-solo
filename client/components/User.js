import React from 'react'
import {me} from '../store/user.js'

const User = (props) => {
  // const {
  //   firstName,
  //   middleName,
  //   lastName,
  //   email,
  //   street1,
  //   street2,
  //   city,
  //   state,
  //   zip,
  // } = props

  const {user} = props

  return (
    <div className="col-md-4 mb-4" key={user.id}>
      <div className="card">
        <h5 className="card-header">
          {user.firstName} {user.middleName} {user.lastName}
        </h5>
        <div className="card-body">
          <p className="card-text">E: {user.email}</p>
          <p>
            {/* <p className="card-text">P: {user.phone}</p> */}
            {user.street1} {user.street2}
            <br></br>
            {user.city}, {user.state}, {user.zip}
          </p>
        </div>
      </div>
    </div>
  )
}

export default User
