import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllItems} from '../store/items'
import SingleItem from './SingleItem'
import MapAllItems from './MapAllItems'
import MobileFooter from './MobileFooter'

// Render functional
// const Placeholder = (props) => <div></div>

// Render Class
class Items extends React.Component {
  componentDidMount() {
    this.props.fetchAllItems()
  }

  createEventListener() {}

  render() {
    const items = this.props.items

    return this.props.loading ? (
      <div
        className="spinner-border position-absolute top-50 start-50 translate-middle"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    ) : (
      <div className="mb-5 container container-lg container-x">
        <h3 className="display-6 text-center text-light bg-secondary rounded-3 ">
          All Current offers
        </h3>
        {console.log(this.props.items)}
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {items.map((item) => (
            <SingleItem key={item.id} item={item} />
          ))}
        </div>
        <div className="fixed-bottom d-md-none">
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
                  'font-size': '1.4rem',
                  color: 'white',
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
                    'font-size': '2rem',
                    color: 'white',
                  }}
                />
              </a>
              <div
                className="bg-secondary rounded-top text-light"
                style={{height: '95vh'}}
              >
                <MapAllItems itemsArray={items} />
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

const mapState = (state) => ({
  items: state.items.items,
  loading: state.items.loading,
})

const mapDispatch = (dispatch) => ({
  fetchAllItems: () => {
    dispatch(fetchAllItems())
  },
})

export default connect(mapState, mapDispatch)(Items)

/**
 * PROP TYPES
 */
Items.propTypes = {
  items: PropTypes.array,
  loading: PropTypes.bool,
}
