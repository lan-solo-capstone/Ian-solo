import React from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import {updateNavbar} from '../store/navbar'
import MapSingleItem from './MapSingleItem'
import {modifyItem} from '../store/item'
import {removeItem} from '../store/items'
import {EditItemForm} from './index'

// Render Class
class SingleItemView extends React.Component {
  constructor(props) {
    super(props)

    this.handleClose = this.handleClose.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.editItemButton = new React.createRef()
  }

  componentDidMount() {
    this.props.updateNavbar('singleview', this.props.location.state.item)
  }

  handleDelete(evt) {
    evt.preventDefault()
    const itemId = String(this.props.location.state.item.id)
    this.props.removeItem(itemId)
  }

  handleOpen(evt) {
    evt.preventDefault()
    const userIsAdmin = this.props.user.admin

    let userId = this.props.user.id
    const itemId = String(this.props.location.state.item.id)

    if (!userIsAdmin) {
      userId = this.props.user.id
    } else {
      userId = this.props.location.state.item.user.id
    }
    this.props.modifyItem(
      itemId,
      {
        user: {id: userId},
        status: 'Open',
      },
      'Item opened!'
    )
  }

  handleClose(evt) {
    evt.preventDefault()

    const userIsAdmin = this.props.user.admin

    let userId

    if (!userIsAdmin) {
      userId = this.props.user.id
    } else {
      userId = this.props.location.state.item.user.id
    }

    const itemId = String(this.props.location.state.item.id)

    this.props.modifyItem(
      itemId,
      {
        user: {id: userId},
        status: 'Closed',
      },
      'Item closed!'
    )
  }

  componentWillUnmount() {
    this.props.updateNavbar(null, {})
  }

  render() {
    if (!this.props.location.state) {
      return <Redirect to="/items" />
    }

    let {item} = this.props.location.state

    const itemMatchesUser = this.props.user.id === item.user.id
    const isAdmin = this.props.user.admin

    return (
      <div className="container-sm container-md container-xl footerSpacing mt-4">
        <div className="row gy-4 row-cols-1 justify-content-center">
          <div className="col row row-cols-1 gy-2">
            <h5 className="col text-center ">{item.itemListName}</h5>
            <div className="col text-center text-secondary fs-6 mb-2">
              Submitted by: {item.user.firstName} as
              {` ${
                this.props.location.state.item.itemType === 'Offer'
                  ? this.props.location.state.item.itemType + 'ing'
                  : this.props.location.state.item.itemType
              }`}
              <br />
              {`Condition: ${this.props.location.state.item.itemCondition}`}
            </div>
            <div className="col row gx-2 justify-content-center">
              {/* only render chat button if item does not belong to user */}
              {!itemMatchesUser && (
                <div className="col-auto text-center messages">
                  <Link
                    to={{
                      pathname: '/messages',
                      item,
                    }}
                  >
                    <div>
                      <button type="button" className="btn btn-success">
                        Reply to this post
                      </button>
                    </div>
                  </Link>
                </div>
              )}
              {/* check if the user has the right to close the item */}

              {item.status === 'Open' && (itemMatchesUser || isAdmin) && (
                <>
                  <div className="col-auto closeItem">
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={this.handleClose}
                    >
                      Mark this item as closed
                    </button>
                  </div>
                  <div className="col-auto">
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      type="button"
                      className="btn btn-warning"
                    >
                      Edit Item
                    </button>

                    {/*Start Modal*/}
                    <div
                      className="modal fade"
                      id="staticBackdrop"
                      data-bs-backdrop="static"
                      data-bs-keyboard="false"
                      tabIndex="-1"
                      aria-labelledby="staticBackdropLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5
                              className="modal-title"
                              id="staticBackdropLabel"
                            >
                              Edit Post
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              ref={this.editItemButton}
                            ></button>
                          </div>
                          <div className="modal-body">
                            <EditItemForm
                              location={this.props.location}
                              editItemButton={this.editItemButton}
                            />
                          </div>
                          <div className="modal-footer justify-content-center">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*End Modal*/}
                  </div>
                </>
              )}

              {/* Allow user or admin to re-open item that has been closed accidentally or prematurely */}
              {item.status === 'Closed' && (itemMatchesUser || isAdmin) && (
                <div className="col-auto closeItem">
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={this.handleOpen}
                  >
                    Re-open item
                  </button>
                </div>
              )}

              {/* Allow admin to delete an item */}
              {isAdmin && (
                <div className="col-auto closeItem mt-2 mt-md-0">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={this.handleDelete}
                  >
                    Delete item
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="col">
            {item.itemPhotos.length < 2 ? (
              <img
                src={item.itemPhotos[0].downloadURL}
                className="d-block w-80 imgSliders"
              />
            ) : (
              <div
                id="itemImageIndicator"
                className="carousel slide mx-auto"
                data-bs-ride="carousel"
              >
                <div
                  className="carousel-indicators"
                  style={{filter: 'invert(1)'}}
                >
                  {item.itemPhotos.map((element, idx) => (
                    <button
                      type="button"
                      data-bs-target="#itemImageIndicator"
                      data-bs-slide-to={idx}
                      className={idx === 0 ? 'active' : ''}
                      aria-current={idx === 0 ? 'true' : ''}
                      aria-label={`Slide ${idx + 1}`}
                      key={idx}
                    />
                  ))}
                </div>
                <div className="carousel-inner">
                  {item.itemPhotos.map((photo, idx) => (
                    <div
                      key={idx}
                      className={
                        idx === 0 ? 'carousel-item active' : 'carousel-item'
                      }
                    >
                      <img
                        src={photo.downloadURL}
                        className="d-block w-80 imgSliders"
                      />
                    </div>
                  ))}
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#itemImageIndicator"
                  data-bs-slide="prev"
                  style={{filter: 'invert(1)'}}
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#itemImageIndicator"
                  data-bs-slide="next"
                  style={{filter: 'invert(1)'}}
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            )}
          </div>
          <div className="col m-sm-auto m-md-0">
            <a
              className="btn btn-secondary mx-auto mb-3 rounded-pill d-flex justify-content-evenly align-items-center d-md-none"
              data-bs-toggle="collapse"
              href="#mapCollapse"
              role="button"
              id="mapCollapseButton"
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
            <div className="fixed-bottom d-md-none">
              <div className="collapse" id="mapCollapse">
                <a
                  className="btn btn-secondary rounded-0 d-flex justify-content-center align-items-center"
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
                  className="bg-secondary rounded-top"
                  id="mapContainer"
                  style={{height: '89vh'}}
                >
                  <MapSingleItem item={item} />
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div
              className="d-flex flex-column justify-content-evenly"
              style={{height: '100%'}}
            >
              <div></div>

              <div>
                <h3 className="text-center mb-1">Description</h3>
                <p
                  className="bg-secondary text-light py-3 px-4 mx-auto fs-6"
                  style={{width: '80%'}}
                >
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */

const mapState = (state) => {
  return {
    user: state.user,
    item: state.item,
  }
}

const mapDispatch = (dispatch) => ({
  updateNavbar: (page, items) => {
    dispatch(updateNavbar(page, items))
  },
  modifyItem: (itemId, modifications, toastMessage) =>
    dispatch(modifyItem(itemId, modifications, toastMessage)),
  removeItem: (itemId) => dispatch(removeItem(itemId)),
})

export default connect(mapState, mapDispatch)(SingleItemView)
