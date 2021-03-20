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
    if (this.props.users.length === 0) {
      return <div>Loading, or we have no users =(</div>
    }
    return <div>All Users</div>
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
    fetchuser: () => {
      dispatch(me())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
