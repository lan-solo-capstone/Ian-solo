import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import MobileFooter from './mobile-footer'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {user} = props

  return (
    <div className="container col-12 col-md-6 col-lg-3 mt-2">
      <h3>Welcome {user.firstName}!</h3>
      Account Details:
      <ul className="list-group">
        <li className="list-group-item">
          {user.firstName} {user.lastName}
        </li>
        <li className="list-group-item">{user.email}</li>
        <li className="list-group-item">{user.street1}</li>
        {user.street2 ? <li>{user.street2}</li> : ''}
        <li className="list-group-item">
          {user.city}, {user.state} {user.zip}
        </li>
        <li className="list-group-item">
          {user.latitude}, {user.longitude}
        </li>
      </ul>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  user: PropTypes.object,
}
