import React, {Component} from 'react'
import {connect} from 'react-redux'
import {modifyExistingUser, fetchExistingUser} from '../store/singleUser'

class EditUserForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      street1: '',
      street2: '',
      city: '',
      state: '',
      zip: '',
    }
  }
  componentDidMount() {
    const userId = this.props.match.params.userId
    this.props.fetchExistingUser(userId)
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <form role="form">
              <div className="form-group">
                <label htmlFor="firstName">First name</label>
                <input type="text" className="form-control" name="firstName" />
              </div>
              <div className="form-group">
                <label htmlFor="middleName">Middle name</label>
                <input type="text" className="form-control" name="middleName" />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last name</label>
                <input type="text" className="form-control" name="lastName" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" name="email" />
              </div>
              <div className="form-group">
                <label htmlFor="street1">Address 1</label>
                <input type="text" className="form-control" name="street1" />
              </div>
              <div className="form-group">
                <label htmlFor="street2">Address 2</label>
                <input type="text" className="form-control" name="street2" />
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input type="text" className="form-control" name="city" />
              </div>
              <div className="form-group">
                <label htmlFor="state">State</label>
                <input type="password" className="form-control" name="state" />
              </div>
              <div className="form-group">
                <label htmlFor="zip">Zip</label>
                <input type="password" className="form-control" name="zip" />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    singleUser: state.singleUser,
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchExistingUser: (userId) => dispatch(fetchExistingUser(userId)),
    modifyExistingUser: (userId) => dispatch(modifyExistingUser(userId)),
  }
}

export default connect(mapState, mapDispatch)(EditUserForm)
