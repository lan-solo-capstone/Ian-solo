import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import {updateNavbar} from '../store/navbar'
import MapSingleItem from './MapSingleItem'
import {closeItem} from '../store/item'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Render functional
// const singleView = (props) => {
//   console.log(props)

// }

// Render Class
class SingleItemView extends React.Component {
  constructor(props) {
    super(props)

    // justClosed is to mark whether the current item's status
    // has just changed from Open to Closed
    this.state = {
      justClosed: false,
    }
    this.handleClose = this.handleClose.bind(this)
  }

  // if user clicks Close button, trigger toast notification
  handleClose(evt) {
    evt.preventDefault()
    const itemId = String(this.props.location.item.id)
    console.log('in handleClose, itemId', itemId)
    this.props.closeItem(itemId)
    toast.success('Successfully marked as Closed!', {
      position: 'top-right',
      autoClose: 5001,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    })
  }

  // check if the item ID matches,
  // and if the status has changed from Open to Closed,
  // and if status has just changed locally on this component
  // then make the "Close" button disappear
  componentDidUpdate(prevProps) {
    if (
      prevProps.location.item.id === this.props.item.id &&
      prevProps.location.item.status !== this.props.item.status &&
      this.state.justClosed === false
    ) {
      console.log('the status of the item has changed!!!!!!!!!!!!!!!!')
      this.setState({justClosed: true})
    }
  }
  componentWillUnmount() {
    this.props.updateNavbar(null, {})
  }

  render() {
    console.log('in SingleItemView render, this.props', this.props)
    let {item} = this.props.location
    console.log('item!!!!', item)

    if (!this.props.location.item) {
      return <Redirect to="/items" />
    }

    return (
      <div className="container-sm container-md container-xl footerSpacing mt-2">
        <div className="row gy-4 row-cols-1 ">
          <div className="col">
            <h5 className="text-center mb-1">{item.itemListName}</h5>
            <h6 className="text-center text-secondary">
              Submitted by: {item.user.firstName}
              {/* only render chat button if item does not belong to user */}
              {this.props.user.id !== item.user.id && (
                <div className="messages">
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
              {this.state.justClosed === false &&
                item.status === 'Open' &&
                this.props.user.id === item.user.id && (
                  <div className="closeItem">
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={this.handleClose}
                    >
                      Mark this item as closed
                    </button>
                  </div>
                )}
              {/* {this.props.user.id === item.user.id && (
                <div className="closeItem">
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={this.handleEdit}
                  >
                    Edit item
                  </button>
                </div>
              )} */}
            </h6>
          </div>
          <div className="col">
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
                  {this.props.updateNavbar('singleview', item)}
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

// const mapState = (state) => ({
//   placeholder: state.placeholder,
// })

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
  closeItem: (itemId) => dispatch(closeItem(itemId)),
})

export default connect(mapState, mapDispatch)(SingleItemView)
