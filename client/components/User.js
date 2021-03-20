/* eslint-disable no-warning-comments */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me} from '../store/user.js'
import {fetchExistingUser} from '../store/singleUser.js'
import {UserView} from './index.js'

class User extends Component {
  // constructor(props) {
  //   super(props)
  // }

  componentDidMount() {
    this.props.fetchUser()
    // TODO: this needs a userId
    const userId = this.props.match.params.id
    this.props.fetchExistingUser(userId)
  }

  componentDidUpdate(prevProps) {
    // TODO: this needs a userId
    const userId = this.props.match.params.id

    if (!prevProps.user.id && this.props.user.id)
      this.props.fetchExistingUser(userId)
  }

  render() {
    console.log('in User render, this.props', this.props)
    return <div>test</div>
  }
}

const mapState = (state) => {
  return {
    user: state.user,
    singleUser: state.singelUser,
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchUser: () => dispatch(me()),
    fetchExistingUser: (userId) => dispatch(fetchExistingUser(userId)),
  }
}

export default connect(mapState, mapDispatch)(User)
