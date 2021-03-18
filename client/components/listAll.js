import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllItems} from '../store/listAll'
import SingleItem from './singleItem'

// Render functional
// const Placeholder = (props) => <div></div>

// Render Class
class ListAll extends React.Component {
  componentDidMount() {
    this.props.fetchAllItems()
  }

  render() {
    const items = this.props.items
    return this.props.loading ? (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    ) : (
      <div className="container px-5">
        Hello we've loaded{console.log(this.props.items)}
        <div className="row gx-5 row-cols-3">
          {items.map((item) => (
            <SingleItem
              key={item.id}
              itemType={item.itemType}
              itemListName={item.itemListName}
            />
          ))}
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
})

export default connect(mapState, mapDispatch)(ListAll)
