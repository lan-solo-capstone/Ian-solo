import React from 'react'

const UserView = (props) => {
  const {
    id,
    firstName,
    lastName,
    email,
    street1,
    street2,
    city,
    state,
    zip,
  } = props.user

  return (
    <div key={id}>
      <h5 className="card-header">
        {firstName} {lastName}
      </h5>
      <div className="card-body text-secondary">
        <p className="card-text">E: {email}</p>
        <p>
          {street1} {street2}
          <br></br>
          {city}
          {city ? ', ' : null}
          {state} {zip}
        </p>
      </div>
    </div>
  )
}

export default UserView
