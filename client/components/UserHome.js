import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchUserItems} from '../store/useritems'
import SingleItem from './SingleItem'

/**
 * COMPONENT
 */

// Render Class
class UserHome extends React.Component {
  componentDidMount() {
    this.props.fetchUserItems(this.props.user.id)
  }

  render() {
    const {user} = this.props
    const {items} = this.props?.useritems

    return (
      <div className="containter-sm container-xl mt-3 mb-4">
        {this.props.useritems.loading
          ? null
          : console.log(this.props.useritems.items)}
        <h3>Welcome {user.firstName}!</h3>
        Account Details:
        <ul className="list-group">
          <li className="list-group-item">
            {user.firstName} {user.lastName}
          </li>
          <li className="list-group-item">{user.email}</li>
          <li className="list-group-item">{user.street1}</li>
          {user.street2 ? (
            <li className="list-group-item">{user.street2}</li>
          ) : null}
          <li className="list-group-item">
            {user.city}, {user.state} {user.zip}
          </li>
          <li className="list-group-item">
            {user.latitude}, {user.longitude}
          </li>
        </ul>
        <div className="row gx-4 text-light mt-2">
          <div className="col bg-secondary rounded">
            <h4>Open Items</h4>
            <div className="row gx-2 row-cols-sm-1 row-cols-md-2">
              {items
                .filter((item) => item.status === 'Open')
                .map((item) => (
                  <SingleItem key={item.id} item={item} />
                ))}
            </div>
          </div>
          <div className="col bg-secondary rounded">
            <h4>Closed Items</h4>
            <div className="row gx-2 row-cols-sm-1 row-cols-md-2">
              {items
                .filter((item) => item.status === 'Closed')
                .map((item) => (
                  <SingleItem key={item.id} item={item} />
                ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapDispatch = (dispatch) => ({
  fetchUserItems: (page, items) => {
    dispatch(fetchUserItems(page, items))
  },
})

const mapState = (state) => {
  return {
    user: state.user,
    useritems: state.useritems,
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  user: PropTypes.object,
}
