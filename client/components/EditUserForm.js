import React, {Component} from 'react'
import {connect} from 'react-redux'
import {modifyExistingUser, fetchExistingUser} from '../store/singleUser'

const initialState = {
  firstName: '',
  middleName: '',
  lastName: '',
  email: '',
  street1: '',
  street2: '',
  city: '',
  state: '',
  zip: '',
  buttonDisabled: false,
}

class EditUserForm extends Component {
  constructor(props) {
    super(props)
    this.state = initialState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  prepopulateForm() {
    if (this.props.singleUser.id) {
      const {
        firstName,
        middleName,
        lastName,
        email,
        street1,
        street2,
        city,
        state,
        zip,
      } = this.props.singleUser

      this.setState({
        firstName,
        middleName,
        lastName,
        email,
        street1,
        street2,
        city,
        state,
        zip,
      })
    }
  }

  // prepopulate form if the user is checking their own profile
  componentDidMount() {
    this.prepopulateForm()
  }

  // The parent component may fetch the user we are editing (if an admin is editing another user).
  // If that user changes, componentDidUpdate will grab the new user's info to pre-populate the form. JC
  componentDidUpdate(prevProps) {
    if (prevProps.singleUser.id !== this.props.singleUser.id) {
      this.prepopulateForm()
    }

    // if the user's profile has been updated,
    // re-enable submit button -- JC 4.1.21
    const prevUser = prevProps.singleUser.updatedAt
    const updatedUser = this.props.singleUser.updatedAt

    if (prevUser !== updatedUser) {
      this.setState({buttonDisabled: false})
    }
  }

  // update form with user input
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    })
  }

  // upon submit, grab the user id and the state and dispatch modifyExistingUser, and disable the submit button temporarily
  handleSubmit(evt) {
    evt.preventDefault()
    const userId = this.props.singleUser.id
    this.props.modifyExistingUser(userId, this.state)
    this.setState({buttonDisabled: true})
  }

  render() {
    return (
      // <div className="container" style={{maxWidth: '800px'}}>
      <form role="form" onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="col-md-6 m-0">
            <label htmlFor="firstName">
              <b>First name</b>
            </label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
          </div>
          <div className="col-md-6 m-0">
            <label htmlFor="lastName">
              <b>Last name</b>
            </label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="street1">
            <b>Address 1</b>
          </label>
          <input
            type="text"
            className="form-control"
            name="street1"
            value={this.state.street1}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="street2">
            <b>Address 2</b>
          </label>
          <input
            type="text"
            className="form-control"
            name="street2"
            value={this.state.street2}
            onChange={this.handleChange}
          />
        </div>
        <div className="row">
          <div className="col-md-6 m-0">
            <label htmlFor="city">
              <b>City</b>
            </label>
            <input
              type="text"
              className="form-control"
              name="city"
              value={this.state.city}
              onChange={this.handleChange}
            />
          </div>
          <div className="col-md-3 m-0">
            <label htmlFor="state">
              <b>State</b>
            </label>
            <input
              type="text"
              className="form-control"
              name="state"
              value={this.state.state}
              onChange={this.handleChange}
            />
          </div>
          <div className="col-md-3 m-0">
            <label htmlFor="zip">
              <b>Zip</b>
            </label>
            <input
              type="text"
              className="form-control"
              name="zip"
              value={this.state.zip}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-2 mb-5"
          disabled={this.state.buttonDisabled}
        >
          Submit
        </button>
      </form>
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
    modifyExistingUser: (userId, modifications) =>
      dispatch(modifyExistingUser(userId, modifications)),
  }
}

export default connect(mapState, mapDispatch)(EditUserForm)
