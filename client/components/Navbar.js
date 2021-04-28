import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {
  MapAllItems,
  MapSingleItem,
  MobileFooter,
  SearchBox,
} from '../components'

const Navbar = (props) => {
  const inputRef = React.useRef(null)
  const mapButton = React.useRef(null)
  const unloadModal = () => mapButton.current.click()
  const {page, items} = props.currentPage
  const {handleClick, isLoggedIn} = props

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-md-5">
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
                  />
                </div>
                <div className="modal-body p-0">
                  <div
                    id="mapContainer"
                    ref={inputRef}
                    style={{width: '100%', height: '85vh'}}
                  >
                    {page === 'listall' && (
                      <>
                        <MapAllItems
                          itemsArray={items}
                          prevRef={inputRef}
                          unloadModal={unloadModal}
                        />
                      </>
                    )}
                    {page === 'singleview' && (
                      <>
                        <MapSingleItem
                          item={items}
                          prevRef={inputRef}
                          unloadModal={unloadModal}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End modal */}

          <div className="collapse navbar-collapse p-0" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <Link
                className="nav-item nav-link mx-1 px-0 d-none d-md-block text-secondary"
                to="/items"
              >
                Browse
              </Link>

              {isLoggedIn ? (
                <>
                  {/* The navbar will show these links after you log in */}

                  <Link
                    className="nav-item nav-link mx-1 d-none d-md-block"
                    to="/post"
                  >
                    Post
                  </Link>
                  <div className="nav-item dropdown d-none d-md-block">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarScrollingDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Account
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarScrollingDropdown"
                    >
                      <Link
                        className="nav-item nav-link dropdown-item"
                        to="/users"
                        hidden={!props.user.admin}
                      >
                        Admin Panel
                      </Link>
                      <Link
                        className="nav-item nav-link dropdown-item"
                        to="/useraccount"
                      >
                        Profile
                      </Link>
                      <Link
                        className="nav-item nav-link dropdown-item"
                        to="/messages/all"
                      >
                        Messages
                      </Link>
                      <a
                        className="nav-item dropdown-item nav-link"
                        href="#"
                        onClick={handleClick}
                      >
                        Logout
                      </a>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  {/* The navbar will show these links before you log in */}

                  <Link
                    className="nav-item nav-link mx-1 d-none d-md-block"
                    to="/login"
                  >
                    Login
                  </Link>
                </>
              )}

              {/* <!-- Button trigger modal --> */}
              {page ? (
                <button
                  type="button"
                  ref={mapButton}
                  className="btn btn-primary d-none d-md-block m-0 ms-2 me-1 mapButton"
                  data-bs-toggle="modal"
                  data-bs-target="#mapModal"
                >
                  Map
                </button>
              ) : null}
            </ul>
            <SearchBox />
          </div>
        </div>
        <div className="fixed-bottom d-md-none">
          {page === 'listall' ? (
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
              <div className="collapse" id="mapCollapse">
                <a
                  className="btn btn-secondary m-auto rounded-0 d-flex justify-content-center align-items-center"
                  data-bs-toggle="collapse"
                  href="#mapCollapse"
                  role="button"
                  style={{width: '100vw', height: '5vh'}}
                >
                  <i
                    className="bi bi-chevron-compact-down text-light"
                    style={{
                      fontSize: '2rem',
                    }}
                  />
                </a>
                <div
                  className="bg-secondary rounded-top text-light"
                  id="mapContainer"
                  style={{height: '89vh'}}
                >
                  <MapAllItems itemsArray={items} />
                </div>
              </div>
            </div>
          ) : null}
          <MobileFooter />
        </div>
      </nav>
    </>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    currentPage: state.navbar,
    user: state.user,
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
