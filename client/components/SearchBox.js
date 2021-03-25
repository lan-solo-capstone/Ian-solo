import React, {Component} from 'react'
import history from '../history'

class SearchBox extends Component {
  constructor() {
    super()
    this.state = {
      search: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const searchString = this.state.search
    if (searchString) {
      //where we redirect w/ props
      history.push({
        pathname: '/items',
        searchBoxParams: {searchString: searchString},
      })
    }
    this.setState({search: ''})
  }

  render() {
    return (
      <form className="row p-0" onSubmit={this.handleSubmit}>
        <div className="m-0 col-6 col-md-3">
          <select
            name="itemType"
            className="form-select form-control "
            aria-label="Listing Type"
          >
            <option selected>Lisitng Type</option>
            <option value="All">All</option>
            <option value="Offer">Offer</option>
            <option value="Seeking">Seeking</option>
          </select>
        </div>
        <div className="m-0 col-6 col-md-3">
          <select
            name="distance"
            className="form-select form-control "
            aria-label="Distance"
          >
            <option selected>Distance</option>
            <option value="1">1 mi</option>
            <option value="5">5 mi</option>
            <option value="10">> 10 mi</option>
          </select>
        </div>
        <div className="m-0 col-9 col-md-5">
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
        <div className="m-0 col-3 col-md-1">
          <button
            className="btn btn-outline-primary m-0 "
            role="button"
            type="submit"
          >
            Go
          </button>
        </div>
      </form>
    )
  }
}

export default SearchBox
