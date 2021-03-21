import React, {Component} from 'react'
import {connect} from 'react-redux'
import {modifyExistingUser} from '../store/singleUser'

class EditUserForm extends Component {
  render() {
    return <div>test</div>
  }
}

const mapDispatch = (dispatch) => {
  return {
    modifyExistingUser: (userId) => dispatch(modifyExistingUser(userId)),
  }
}

export default connect(null, mapDispatch)(EditUserForm)
