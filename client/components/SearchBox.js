import React, {Component} from 'react'
import history from '../history'
import {connect} from 'react-redux'

const initialState = {
  search: '',
  itemType: 'All',
  distance: 'Anywhere',
}

class SearchBox extends Component {
  constructor() {
    super()
    this.state = {
      search: '',
      itemType: 'All',
      distance: 'Anywhere',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const searchString = this.state.search
    const searchItemType = this.state.itemType
    const searchDistance = this.state.distance

    //where we redirect w/ props
    history.push({
      pathname: '/items',
      searchBoxParams: {
        searchString: searchString,
        searchItemType: searchItemType,
        searchDistance: searchDistance,
      },
    })
  }

  handleReset(evt) {
    evt.preventDefault()
    this.setState(initialState)
    history.push({
      pathname: '/items',
    })
  }

  render() {
    return (
      <form className="row p-0 mx-md-3" onSubmit={this.handleSubmit}>
        <div
          className={
            this.props.isLoggedIn
              ? 'm-0 mb-1 col-6 col-md-3'
              : 'm-0 mb-1 col-12 col-md-6'
          }
        >
          <select
            name="itemType"
            className="form-select form-control m-0"
            aria-label="Listing Type"
            onChange={this.handleChange}
            value={this.state.itemType}
          >
            <option value="All">All Items</option>
            <option value="Offer">Offers Only</option>
            <option value="Seeking">Seeking Only</option>
          </select>
        </div>

        {this.props.isLoggedIn ? (
          <div className="m-0 mb-1 col-6 col-md-3">
            <select
              name="distance"
              className="form-select form-control m-0"
              aria-label="Distance"
              onChange={this.handleChange}
              value={this.state.distance}
            >
              <option value="Anywhere">Anywhere</option>
              <option value="1">Within 1 mi</option>
              <option value="5">Within 5 mi</option>
              <option value="10">Within 10 mi</option>
              <option value="20">Within 20 mi</option>
            </select>
          </div>
        ) : null}

        <div className="m-0 mb-1 col-6 col-md-4">
          <input
            className="form-control m-0"
            type="search"
            name="search"
            placeholder="Keywords"
            aria-label="Search"
            onChange={this.handleChange}
            value={this.state.search}
          ></input>
        </div>
        <div className="m-0 mb-1 col-3 col-md-1">
          <button
            className="btn btn-outline-primary m-0 "
            role="button"
            type="submit"
          >
            Go
          </button>
        </div>
        <div className="m-0 mb-1 col-3 col-md-1">
          <button
            className="btn btn-outline-primary m-0 "
            role="button"
            type="button"
            onClick={this.handleReset}
          >
            Reset
          </button>
        </div>
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
  }
}
export default connect(mapStateToProps, null)(SearchBox)
