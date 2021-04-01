import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllItems, allItemsUnload} from '../store/items'
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

    // reset loading status = true
    this.props.allItemsUnload()
  }

  render() {
    //Begin search and filter code:
    let items

    let headline = `All Current Offers`
    if (this.props.location.searchBoxParams) {
      const keyWords = this.props.location.searchBoxParams.searchString.split(
        ' '
      )
      //Calc distance between two coords using Haversine Formula
      const calcMiles = (lat1, lon1, lat2, lon2) => {
        lat1 *= Math.PI / 180
        lat2 *= Math.PI / 180
        const latDif = lat2 - lat1
        const lonDif = ((lon2 - lon1) * Math.PI) / 180
        const h =
          Math.sin(latDif / 2) ** 2 +
          Math.cos(lat1) * Math.cos(lat2) * Math.sin(lonDif / 2) ** 2
        return 2 * 3958.75 * Math.asin(Math.sqrt(h))
      }

      items = this.props.items
        .filter((item) => {
          if (this.props.location.searchBoxParams.searchItemType === 'All') {
            return item
          } else if (
            this.props.location.searchBoxParams.searchItemType === 'Offer' &&
            item.itemType === 'Offer'
          ) {
            return item
          } else if (
            this.props.location.searchBoxParams.searchItemType === 'Seeking' &&
            item.itemType === 'Seeking'
          ) {
            return item
          }
        })
        .filter((item) => {
          if (
            this.props.location.searchBoxParams.searchDistance === 'Anywhere'
          ) {
            return item
          } else if (
            calcMiles(
              +this.props.user.latitude,
              +this.props.user.longitude,
              +item.user.latitude,
              +item.user.longitude
            ) <= +this.props.location.searchBoxParams.searchDistance
          ) {
            return item
          }
        })
        .filter((item) => {
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
      headline =
        items.length > 0 ? `Matches Found: ${items.length}` : 'No Matches Found'
    } else {
      items = this.props.items
    }

    //end search and filter code

    return this.props.loading ? (
      <div
        className="spinner-border position-absolute top-50 start-50 translate-middle"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    ) : (
      <div className="container container-lg container-xxl footerSpacing mt-2">
        <h3 className="display-6 text-center text-light bg-secondary rounded-3 p-2">
          {headline}
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
  user: state.user,
})

const mapDispatch = (dispatch) => ({
  fetchAllItems: () => {
    dispatch(fetchAllItems())
  },
  updateNavbar: (page, items) => {
    dispatch(updateNavbar(page, items))
  },
  //4.1.21 this resets loading status = true in unmount
  allItemsUnload: () => {
    dispatch(allItemsUnload())
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
