/* eslint-disable no-warning-comments */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me} from '../store/user.js'
import {fetchExistingUser} from '../store/singleUser.js'
import {UserView, EditUserForm} from './index.js'

class User extends Component {
  componentDidMount() {
    this.props.fetchUser()
    const userId = this.props.match.params.userId
    console.log('in componentDidMount', {userId})
    this.props.fetchExistingUser(userId)
  }

  componentDidUpdate(prevProps) {
    const userId = this.props.match.params.userId

    if (!prevProps.user.id && this.props.userId)
      this.props.fetchExistingUser(userId)
  }

  render() {
    // only render user info if current user has the right to view it
    // must be an admin or viewing user's own profile
    const {admin, id} = this.props.user
    if (!admin && this.props.singleUser.id !== id) {
      return <div>Sorry, you are not authorized to view this page. </div>
    }
    console.log('in User render, this.props', this.props)
    return (
      <div className="container">
        <UserView user={this.props.singleUser} />
        <EditUserForm />
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    user: state.user,
    singleUser: state.singleUser,
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchUser: () => dispatch(me()),
    fetchExistingUser: (userId) => dispatch(fetchExistingUser(userId)),
  }
}

export default connect(mapState, mapDispatch)(User)
