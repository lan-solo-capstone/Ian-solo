/* eslint-disable no-warning-comments */
/* eslint-disable complexity */
import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import {updateNavbar} from '../store/navbar'
import MapSingleItem from './MapSingleItem'
import {modifyItem} from '../store/item'
import {EditItemForm} from './index'

// Render Class
class SingleItemView extends React.Component {
  constructor(props) {
    super(props)

    this.handleClose = this.handleClose.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
  }

  componentDidMount() {
    this.props.updateNavbar('singleview', this.props.location.state.item)
  }

  handleOpen(evt) {
    evt.preventDefault()

    const userId = this.props.user.id
    const itemId = String(this.props.location.state.item.id)

    this.props.modifyItem(
      itemId,
      {
        user: {id: userId},
        status: 'Open',
      },
      'Successfully marked as Open!'
    )
  }

  handleClose(evt) {
    evt.preventDefault()

    const userId = this.props.user.id
    const itemId = String(this.props.location.state.item.id)

    this.props.modifyItem(
      itemId,
      {
        user: {id: userId},
        status: 'Closed',
      },
      'Successfully marked as Closed!'
    )
  }

  componentWillUnmount() {
    this.props.updateNavbar(null, {})
  }

  render() {
    console.log('in SingleItemView render, this.props', this.props)
    console.log('in SingleItemView render, this.state', this.state)
    if (!this.props.location.state) {
      return <Redirect to="/items" />
    }

    let {item} = this.props.location.state
    console.log('SingleItemView item!!!!', item)

    // TODO: try this loading instead of the one above
    // this.props.loading ? (
    //   <div
    //     className="spinner-border position-absolute top-50 start-50 translate-middle"
    //     role="status"
    //   >
    //     <span className="visually-hidden">Loading...</span>
    //   </div>
    // ) :
    // -- JC 3.29.21

    const itemMatchesUser = this.props.user.id === item.user.id

    return (
      <div className="container-sm container-md container-xl footerSpacing mt-4">
        <div className="row gy-4 row-cols-1 justify-content-center">
          <div className="col row row-cols-1 gy-2">
            <h5 className="col text-center ">{item.itemListName}</h5>
            <h6 className="col text-center text-secondary">
              Submitted by: {item.user.firstName}
            </h6>
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

              {
                // this.state.justClosed === false &&
                item.status === 'Open' && itemMatchesUser && (
                  <div className="col-auto closeItem">
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={this.handleClose}
                    >
                      Mark this item as closed
                    </button>
                  </div>
                )
              }
              {/* render the Edit button if the user owns the item and it is not closed */}
              {/* {this.props.user.id === item.user.id &&
                (!this.state.justClosed || item.status === 'Closed') && (
                   <div className="col-auto editItem">
                     <button
                       type="button"
                       className="btn btn-warning"
                       onClick={this.handleEdit}
                     >
                       Edit item
                     </button>
                   </div>
                 )}
             </div>
                 )
               } */}
              {/* Allow user to re-open item that has been closed accidentally or prematurely */}
              {item.status === 'Closed' && itemMatchesUser && (
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
        {itemMatchesUser && <EditItemForm location={this.props.location} />}
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
})

export default connect(mapState, mapDispatch)(SingleItemView)
