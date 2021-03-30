import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <>
      <div className="container-fluid login-bg text-center">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-9 col-md-6 col-lg-4 col-xl-3">
            <form
              className="login-form-container p-3"
              onSubmit={handleSubmit}
              name={name}
            >
              <div className="text-center mb-0">
                <h3>Freeshare {displayName}</h3>
              </div>
              <div>
                <input
                  name="email"
                  type="email"
                  className="form-control mb-1"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Email"
                />
                {displayName === 'Sign Up' ? (
                  <>
                    <input
                      name="firstName"
                      type="text"
                      className="form-control mb-1"
                      id="exampleInputFirstName"
                      aria-describedby="emailHelp"
                      placeholder="First Name"
                    />

                    <input
                      name="lastName"
                      type="text"
                      className="form-control mb-1"
                      id="exampleInputLastName"
                      aria-describedby="emailHelp"
                      placeholder="Last Name"
                    />

                    <input
                      name="street1"
                      type="text"
                      className="form-control mb-1"
                      id="exampleInputStreet1"
                      aria-describedby="emailHelp"
                      placeholder="Street Address Line 1"
                    />

                    <input
                      name="street2"
                      type="text"
                      className="form-control mb-1"
                      id="exampleInputStreet2"
                      aria-describedby="emailHelp"
                      placeholder="Street Address Line 2"
                    />

                    <input
                      name="city"
                      type="text"
                      className="form-control mb-1"
                      id="exampleInputCity"
                      aria-describedby="emailHelp"
                      placeholder="City"
                    />

                    <input
                      name="state"
                      type="text"
                      className="form-control mb-1"
                      id="exampleInputState"
                      aria-describedby="emailHelp"
                      placeholder="State"
                    />

                    <input
                      name="zip"
                      type="text"
                      className="form-control mb-1"
                      id="exampleInputZip"
                      aria-describedby="emailHelp"
                      placeholder="Zip"
                    />
                  </>
                ) : (
                  ''
                )}

                <input
                  name="password"
                  type="password"
                  className="form-control mb-1"
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
              </div>

              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary my-1 mx-5">
                  {displayName}
                </button>
              </div>
              {error && error.response && (
                <div
                  className="alert alert-danger alert-dismissible fade show"
                  role="alert"
                >
                  {' '}
                  {error.response.data}{' '}
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  />{' '}
                </div>
              )}
              <a href="/auth/google">{displayName} with Google</a>
              <div className="mt-1">
                {displayName === 'Login' ? (
                  <span>
                    Not registered?{' '}
                    <Link className="text-decoration-none" to="/signup">
                      Sign Up
                    </Link>
                  </span>
                ) : (
                  <span>
                    Already registered?{' '}
                    <Link className="text-decoration-none" to="/login">
                      Login
                    </Link>
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error,
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      const firstName = evt.target.firstName ? evt.target.firstName.value : null
      const lastName = evt.target.lastName ? evt.target.lastName.value : null
      const street1 = evt.target.street1 ? evt.target.street1.value : null
      const street2 = evt.target.street2 ? evt.target.street2.value : null
      const city = evt.target.city ? evt.target.city.value : null
      const state = evt.target.state ? evt.target.state.value : null
      const zip = evt.target.zip ? evt.target.zip.value : null
      dispatch(
        auth(
          email,
          password,
          formName,
          firstName,
          lastName,
          street1,
          street2,
          city,
          state,
          zip
        )
      )
    },
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
}
