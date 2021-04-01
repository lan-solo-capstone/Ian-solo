/* eslint-disable no-warning-comments */
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

  console.log('in UserView, props', props)
  return (
    <div key={id}>
      {/* TODO: Diego, I'm so sorry my CSS/design/layout skills are so bad -- JC */}
      <h5 className="card-header">
        {firstName} {middleName} {lastName}
      </h5>
      <div className="card-body text-secondary">
        <p className="card-text">E: {email}</p>
        <p>
          {street1} {street2}
          <br></br>
          {city}, {state}, {zip}
        </p>
      </div>
    </div>
  )
}

export default UserView
