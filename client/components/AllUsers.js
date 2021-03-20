import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../store/users.js'
import {me} from '../store/user.js'

class AllUsers extends Component {
  componentDidMount() {
    this.props.fetchUsers()
    this.props.fetchUser()
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.user.id && this.props.user.id) {
      this.props.fetchUsers()
    }
  }
  render() {
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
    fetchUser: () => dispatch(me()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
