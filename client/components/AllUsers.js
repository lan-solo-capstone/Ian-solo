import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUsers, removeExistingUser} from '../store/users.js'
import {me} from '../store/user.js'
import {UserView} from './index.js'
import {Link} from 'react-router-dom'

class AllUsers extends Component {
  // need to fetch all the users
  // need to fetch the current logged in user to later check if admin
  componentDidMount() {
    this.props.fetchUsers()
    this.props.fetchUser()
  }

  // need this logic in case we refresh the page we're on,
  // which would necessitate reloading the user in componentDidMount
  // i.e., we may not have the rights to get all users yet
  // until the logged in user is successfully loaded

  componentDidUpdate(prevProps) {
    if (!prevProps.user.id && this.props.user.id) {
      this.props.fetchUsers()
    }
  }

  render() {
    if (!this.props.user.admin) {
      return <div>Sorry, you must be an admin to view this page.</div>
    }
    console.log('in render this.props', this.props)
    if (this.props.users.length === 0) {
      return <div>Loading, or we have no users =(</div>
    }

    const {users} = this.props || []
    return (
      <div className="container mt-4">
        <div className="row">
          {users.map((user) => {
            return (
              <div key={user.id}>
                <div className="col-md-4 mb-4">
                  <div className="card">
                    <Link to={`/users/${user.id}`}>
                      <UserView user={user} />
                    </Link>
                    <button
                      type="button"
                      onClick={() => this.props.removeExistingUser(user.id)}
                      className="btn btn-danger"
                    >
                      Delete User
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => {
      dispatch(fetchUsers())
    },
    removeExistingUser: (userId) => {
      dispatch(removeExistingUser(userId))
    },
    fetchUser: () => dispatch(me()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
