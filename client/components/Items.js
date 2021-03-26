import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllItems} from '../store/items'
import {updateNavbar} from '../store/navbar'
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

  componentWillUnmount() {
    this.props.updateNavbar(null, {})
  }

  render() {
    //next line is Diego's original code:
    // const items = this.props.items
    //the following are MJA changes for the search capability:
    let items

    let headline = 'All Current offers'
    if (this.props.location.searchBoxParams) {
      const keyWords = this.props.location.searchBoxParams.searchString.split(
        ' '
      )
      items = this.props.items.filter((item) => {
        for (let i = 0; i < keyWords.length; i++) {
          if (
            item.itemListName
              .toLowerCase()
              .includes(keyWords[i].toLowerCase()) ||
            item.description.toLowerCase().includes(keyWords[i].toLowerCase())
          ) {
            return item
          }
        }
      })
      headline = 'Results for: ' + keyWords.join(', ')
    } else {
      items = this.props.items
    }

    //end of MJA changes

    return this.props.loading ? (
      <div
        className="spinner-border position-absolute top-50 start-50 translate-middle"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    ) : (
      <div className="mb-5 container container-lg container-xxl">
        <h3 className="display-6 text-center text-light bg-secondary rounded-3 p-2">
          {/* All Current offers */}
          {headline}

          {this.props.location.searchBoxParams ? (
            <>
              <span> | </span>
              <Link
                to="/items"
                className="text-decoration-none text-warning m-0"
              >
                <span>Reset</span>
              </Link>
            </>
          ) : null}
        </h3>
        {console.log(this.props.items)}
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {this.props.updateNavbar('listall', items)}
          {items.map((item) => (
            <SingleItem key={item.id} item={item} />
          ))}
        </div>
        {/* <div className="fixed-bottom d-md-none">
          <div>

            <MobileFooter />

          </div>
        </div> */}
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
  updateNavbar: (page, items) => {
    dispatch(updateNavbar(page, items))
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
