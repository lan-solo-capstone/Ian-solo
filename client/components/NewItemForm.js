import React, {Component} from 'react'
import {connect} from 'react-redux'
import {postNewItem} from '../store/item-jae.js'

class NewItemForm extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <form role="form">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Item Name</label>
                <input type="text" className="form-control" id="itemName" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Item Description</label>
                <textarea
                  className="form-control"
                  id="itemDescription"
                  rows="5"
                />
              </div>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <a className="dropdown-item disabled" href="#">
                  Condition
                </a>
                <a className="dropdown-item" href="#">
                  Like New
                </a>
                <a className="dropdown-item" href="#">
                  Super Old
                </a>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputFile">File input</label>
                <input
                  type="file"
                  // need to add other file types to support
                  accept="image/x-png,image/jpeg,image/gif"
                  className="form-control-file"
                  id="exampleInputFile"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNewItem: (item) => dispatch(postNewItem(item)),
  }
}
export default connect(null, mapDispatchToProps)(NewItemForm)
