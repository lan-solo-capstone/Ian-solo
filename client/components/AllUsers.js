import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../store/users.js'

class AllUsers extends Component {
  render() {
    return <div>All Users</div>
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => {
      dispatch(fetchUsers())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
