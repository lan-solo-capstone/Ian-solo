import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import MapAllItems from './MapAllItems'
import MobileFooter from './MobileFooter'
import MapSingleItem from './MapSingleItem'
import SearchBox from './SearchBox'

class Navbar extends React.Component {
  componentDidMount() {
    this.inputRef = React.createRef()
  }

  componentWillUnmount() {
    this.inputRef = null
  }

  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
          <div className="container-fluid">
            <Link to="/items" className="text-decoration-none text-dark m-0">
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

            {/* <!-- Modal --> */}
            <div
              className="modal fade"
              id="mapModal"
              tabIndex="-1"
              aria-labelledby="mapModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-md modal-lg modal-xl">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="mapModalLabel">
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
                    <div
                      id="mapContainer"
                      ref={this.inputRef}
                      style={{width: '100%', height: '85vh'}}
                    >
                      {this.props.currentPage.page === 'listall' ? (
                        <>
                          {console.log(this.props.currentPage.page)}
                          <MapAllItems
                            itemsArray={this.props.currentPage.items}
                            prevRef={this.inputRef}
                          />
                        </>
                      ) : null}
                      {this.props.currentPage.page === 'singleview' ? (
                        <>
                          {console.log(this.props.currentPage.page)}
                          <MapSingleItem
                            item={this.props.currentPage.items}
                            prevRef={this.inputRef}
                          />
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Ends modal */}

            <div className="collapse navbar-collapse" id="navbarNav">
              <Link
                className="nav-item nav-link mx-2 d-none d-md-block text-secondary"
                to="/items"
              >
                Browse All
              </Link>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {this.props.isLoggedIn ? (
                  <>
                    {/* The navbar will show these links after you log in */}
                    <Link
                      className="nav-item nav-link mx-2 d-none d-md-block"
                      to="/useraccount"
                    >
                      Account
                    </Link>
                    <Link
                      className="nav-item nav-link mx-2 d-none d-md-block"
                      to="/post"
                    >
                      Post an Item
                    </Link>
                    <a
                      className="nav-item nav-link mx-2"
                      href="#"
                      onClick={this.props.handleClick}
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
                {this.props.currentPage.page ? (
                  <button
                    type="button"
                    className="btn btn-primary d-none d-md-block "
                    data-bs-toggle="modal"
                    data-bs-target="#mapModal"
                  >
                    View Map
                  </button>
                ) : null}
              </ul>
              <SearchBox />
            </div>
          </div>
          <div className="fixed-bottom d-md-none">
            {this.props.currentPage.page === 'listall' ? (
              <div>
                <a
                  className="btn btn-secondary mx-auto mb-3 rounded-pill d-flex justify-content-evenly align-items-center"
                  data-bs-toggle="collapse"
                  href="#mapCollapse"
                  role="button"
                  id="collapseButton"
                  style={{width: '150px', height: '30px'}}
                >
                  <p className="m-0">View on map</p>
                  <i
                    className="bi bi-compass"
                    style={{
                      color: 'white',
                      fontSize: '1.4rem',
                    }}
                  />
                </a>

                <MobileFooter />
                <div className="collapse" id="mapCollapse">
                  <a
                    className="btn btn-secondary m-auto rounded-0 d-flex justify-content-center align-items-center"
                    data-bs-toggle="collapse"
                    href="#mapCollapse"
                    role="button"
                    style={{width: '100vw', height: '5vh'}}
                  >
                    <i
                      className="bi bi-chevron-compact-up"
                      id="chevron-rotate"
                      style={{
                        color: 'white',
                        fontSize: '2rem',
                      }}
                    />
                  </a>
                  <div
                    className="bg-secondary rounded-top text-light"
                    id="mapContainer"
                    style={{height: '95vh'}}
                  >
                    <MapAllItems itemsArray={this.props.currentPage.items} />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </nav>
      </>
    )
  }
}

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
