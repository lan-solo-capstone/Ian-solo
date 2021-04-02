import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchUserItems} from '../store/useritems'
import SingleItem from './SingleItem'
import {logout} from '../store'

/**
 * COMPONENT
 */

// Render Class
class UserHome extends React.Component {
  componentDidMount() {
    this.props.fetchUserItems(this.props.user.id)
    console.log(
      'in UserHome componentDidMount ------------, this.props',
      this.props
    )
  }

  render() {
    const {user} = this.props
    let {items} = this.props.useritems

    // Attach the user to each item
    items = items.map((item) => {
      item.user = user
      return item
    })
    console.log('in UserHome render, this.props', this.props)
    return (
      <div className="containter-sm container-xl mt-3 footerSpacing">
        {this.props.useritems.loading ? null : console.log(items)}
        <h3>Welcome {user.firstName}!</h3>
        <ol className="breadcrumb">
          <li className="breadcrumb-item" aria-current="page">
            Account Details
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link to={`/users/${user.id}`} className="text-decoration-none">
              Edit Profile
            </Link>
          </li>
          {this.props.user.admin && (
            <li className="breadcrumb-item active" aria-current="page">
              <Link to="/users" className="text-decoration-none">
                Admin Home
              </Link>
            </li>
          )}
          <li className="breadcrumb-item active" aria-current="page">
            <Link to="/messages" className="text-decoration-none">
              Messages
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <a
              className="text-decoration-none"
              href="#"
              onClick={this.props.handleClick}
            >
              Logout
            </a>
          </li>
        </ol>
        <ul className="list-group">
          <li className="list-group-item">
            {user.firstName} {user.lastName}
          </li>
          <li className="list-group-item">{user.email}</li>
          {user.street1 ? (
            <li className="list-group-item">{user.street1}</li>
          ) : (
            <li className="list-group-item text-danger">
              Please edit your profile to complete address!
            </li>
          )}
          {user.street2 ? (
            <li className="list-group-item">{user.street2}</li>
          ) : null}
          <li className="list-group-item">
            {user.city}
            {user.city ? ', ' : null}
            {user.state} {user.zip}
          </li>
        </ul>
        <div className="row gx-2 row-cols-1 row-cols-md-2 text-secondary mt-3">
          <div className="col text-light">
            <div className="mx-auto">
              <a
                className="btn btn-secondary m-1 bg-light py-2 text-secondary text-center"
                style={{width: '99%'}}
                data-bs-toggle="collapse"
                href="#multiCollapseOpen"
                aria-expanded="true"
                aria-controls="multiCollapseOpen"
                role="button"
              >
                <h4 className="m-0">Open Items </h4>
                <i
                  className="bi bi-chevron-compact-down text-secondary"
                  style={{
                    fontSize: '2rem',
                  }}
                />
              </a>
              <div
                className="collapse multi-collapse rounded bg-secondary"
                id="multiCollapseOpen"
              >
                <div className="row gx-2 p-2 row-cols-1 row-cols-md-2">
                  {items
                    .filter((item) => item.status === 'Open')
                    .map((item) => (
                      <SingleItem key={item.id} item={item} />
                    ))}
                </div>
                <a
                  className="btn btn-secondary m-1 bg-light py-2 text-secondary text-center"
                  style={{width: '99%'}}
                  data-bs-toggle="collapse"
                  href="#multiCollapseOpen"
                  aria-expanded="true"
                  aria-controls="multiCollapseOpen"
                  role="button"
                >
                  <div className="m-0 fs-5">Collapse</div>
                  <i
                    className="bi bi-chevron-compact-up text-secondary"
                    style={{
                      fontSize: '1.5rem',
                    }}
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="col text-light">
            <div className="mx-auto">
              <a
                className="btn btn-secondary m-1 bg-light py-2 text-secondary text-center"
                style={{width: '99%'}}
                data-bs-toggle="collapse"
                href="#multiCollapseClosed"
                aria-expanded="true"
                aria-controls="multiCollapseClosed"
                role="button"
              >
                <h4 className="m-0">Closed Items </h4>
                <i
                  className="bi bi-chevron-compact-down text-secondary"
                  style={{
                    fontSize: '2rem',
                  }}
                />
              </a>
              <div
                className="collapse multi-collapse rounded bg-secondary"
                id="multiCollapseClosed"
              >
                <div className="row gx-2 p-2 row-cols-1 row-cols-md-2">
                  {items
                    .filter((item) => item.status === 'Closed')
                    .map((item) => (
                      <SingleItem key={item.id} item={item} />
                    ))}
                </div>
                <a
                  className="btn btn-secondary m-1 bg-light py-2 text-secondary text-center"
                  style={{width: '99%'}}
                  data-bs-toggle="collapse"
                  href="#multiCollapseClosed"
                  aria-expanded="true"
                  aria-controls="multiCollapseClosed"
                  role="button"
                >
                  <div className="m-0 fs-5">Collapse</div>
                  <i
                    className="bi bi-chevron-compact-up text-secondary"
                    style={{
                      fontSize: '1.5rem',
                    }}
                  />
                </a>
              </div>
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
  handleClick: () => {
    dispatch(logout())
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
