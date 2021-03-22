import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import MapAllItems from './MapAllItems'
import MobileFooter from './mobileFooter'
import MapSingleItem from './MapSingleItem'

const Navbar = ({handleClick, isLoggedIn, currentPage}) => (
  <>
    {console.log(currentPage)}
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/listall" className="text-decoration-none text-dark m-0">
          <span className="navbar-brand">
            <strong>Freeshare</strong>
          </span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {isLoggedIn ? (
              <>
                {/* The navbar will show these links after you log in */}
                <Link className="nav-item nav-link mx-2" to="/home">
                  Account
                </Link>
                <Link className="nav-item nav-link mx-2" to="/post">
                  Post an Item
                </Link>
                <a
                  className="nav-item nav-link mx-2"
                  href="#"
                  onClick={handleClick}
                >
                  Logout
                </a>
              </>
            ) : (
              <>
                {/* The navbar will show these links before you log in */}
                <Link className="nav-item nav-link mx-2" to="/login">
                  Login
                </Link>
                <Link className="nav-item nav-link mx-2" to="/signup">
                  Sign Up
                </Link>
              </>
            )}
            {/* <!-- Button trigger modal --> */}
            {currentPage.page ? (
              <button
                type="button"
                className="btn btn-primary d-none d-md-block"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                View Map
              </button>
            ) : null}

            {/* <!-- Modal --> */}
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-lg modal-xl">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Map
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body p-0">
                    <div style={{width: '100%', height: '85vh'}}>
                      {currentPage.page === 'listall' ? (
                        <MapAllItems itemsArray={currentPage.items} />
                      ) : null}
                      {currentPage.page === 'singleview' ? (
                        <MapSingleItem item={currentPage.items} />
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Ends modal */}
          </ul>
        </div>
      </div>
      <div className="fixed-bottom d-md-none">
        <MobileFooter />
      </div>
    </nav>
  </>
)

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    currentPage: state.navbar,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    },
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
