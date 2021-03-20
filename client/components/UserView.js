import React from 'react'
import {Link} from 'react-router-dom'

const UserView = (props) => {
  const {
    id,
    firstName,
    middleName,
    lastName,
    email,
    street1,
    street2,
    city,
    state,
    zip,
  } = props.user

  console.log('in User, props', props)
  return (
    <div className="col-md-4 mb-4" key={id}>
      <div className="card">
        <h5 className="card-header">
          {firstName} {middleName} {lastName}
        </h5>
        <div className="card-body">
          <p className="card-text">E: {email}</p>
          <p>
            {street1} {street2}
            <br></br>
            {city}, {state}, {zip}
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserView
