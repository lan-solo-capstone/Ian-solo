import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllItems} from '../store/listAll'
import {updateNavbar} from '../store/navbar'
import SingleItem from './singleItem'
import MapAllItems from './MapAllItems'
import MobileFooter from './mobileFooter'

// Render functional
// const Placeholder = (props) => <div></div>

// Render Class
class ListAll extends React.Component {
  componentDidMount() {
    this.props.fetchAllItems()
  }

  componentWillUnmount() {
    this.props.updateNavbar(null, {})
  }

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
      <div className="mb-5 container container-lg container-xxl">
        <h3 className="display-6 text-center text-light bg-secondary rounded-3 ">
          All Current offers
        </h3>
        {console.log(this.props.items)}
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {this.props.updateNavbar('listall', items)}
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
  items: state.listAll.items,
  loading: state.listAll.loading,
})

const mapDispatch = (dispatch) => ({
  fetchAllItems: () => {
    dispatch(fetchAllItems())
  },
  updateNavbar: (page, items) => {
    dispatch(updateNavbar(page, items))
  },
})

export default connect(mapState, mapDispatch)(ListAll)

/**
 * PROP TYPES
 */
ListAll.propTypes = {
  items: PropTypes.array,
  loading: PropTypes.bool,
}
