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
}

class EditUserForm extends Component {
  constructor(props) {
    super(props)
    this.state = initialState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    // const userId = this.props.match.params.userId
    // this.props.fetchExistingUser(userId)
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

    if (this.props.singleUser.id) {
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

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    })
  }
  handleSubmit(evt) {
    evt.preventDefault()
    const userId = this.props.singleUser.id
    this.props.modifyExistingUser(userId, this.state)
    this.setState(initialState)
  }
  render() {
    console.log('in EditUserForm render, this.props', this.props)
    console.log('in EditUserForm render this.state', this.state)
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <form role="form" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="firstName">First name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="middleName">Middle name</label>
                <input
                  type="text"
                  className="form-control"
                  name="middleName"
                  value={this.state.middleName}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="street1">Address 1</label>
                <input
                  type="text"
                  className="form-control"
                  name="street1"
                  value={this.state.street1}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="street2">Address 2</label>
                <input
                  type="text"
                  className="form-control"
                  name="street2"
                  value={this.state.street2}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={this.state.city}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  className="form-control"
                  name="state"
                  value={this.state.state}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="zip">Zip</label>
                <input
                  type="text"
                  className="form-control"
                  name="zip"
                  value={this.state.zip}
                  onChange={this.handleChange}
                />
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
    modifyExistingUser: (userId, modifications) =>
      dispatch(modifyExistingUser(userId, modifications)),
  }
}

export default connect(mapState, mapDispatch)(EditUserForm)
