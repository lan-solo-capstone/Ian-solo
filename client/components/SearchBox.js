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
      <form className="d-flex " onSubmit={this.handleSubmit}>
        <input
          className="form-control me-1"
          type="search"
          name="search"
          placeholder="Keyword Filter"
          aria-label="Search"
          onChange={this.handleChange}
          value={this.state.search}
        ></input>
        <button className="btn btn-outline-primary" role="button" type="submit">
          Go
        </button>
      </form>
    )
  }
}

export default SearchBox
