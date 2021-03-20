/* eslint-disable no-warning-comments */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me, fetchExistingUser} from '../store/user.js'
import {UserView} from './index.js'

class User extends Component {
  componentDidMount() {
    this.props.fetchUser()
    // TODO: this needs a userId
    this.props.fetchExistingUser()
  }

  componentDidUpdate(prevProps) {
    // TODO: this needs a userId
    if (!prevProps.user.id && this.props.user.id) this.props.fetchExistingUser()
  }

  render() {
    console.log('in User render, this.props', this.props)
    return <div>test</div>
  }
}

const mapState = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchUser: () => dispatch(me()),
    fetchExistingUser: (userId) => dispatch(fetchExistingUser(userId)),
  }
}

export default connect(mapState, mapDispatch)(User)
